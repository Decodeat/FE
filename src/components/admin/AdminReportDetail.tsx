import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { useAdminReportDetail } from "../../hooks/useAdminReportDetail";
import { useMessageModal } from "../../hooks/useMessageModal";
import MessageModal from "../ui/MessageModal";
import { acceptNutritionReport, acceptImageReport, rejectReport } from "../../apis/adminReports";
import type { NutritionInfo } from "../../types/report";

const AdminReportDetail: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const {
    data: report,
    isLoading,
    error,
  } = useAdminReportDetail({
    reportId: Number(reportId!),
  });

  const { modalState, showSuccess, showError, showConfirm, hideModal } = useMessageModal();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAcceptReport = async () => {
    if (!report) return;

    try {
      if (report.reportType === "NUTRITION_UPDATE") {
        showConfirm(
          "사용자가 요청한 영양성분 정보로 업데이트됩니다.",
          async () => {
            try {
              await acceptNutritionReport(report.reportId);
              showSuccess("영양성분이 성공적으로 수정되었습니다.");
              setTimeout(() => navigate(-1), 2000);
            } catch {
              showError("영양성분 수정 중 오류가 발생했습니다.");
            }
          },
          "영양성분 수정을 승인하시겠습니까?",
        );
      } else if (report.reportType === "INAPPROPRIATE_IMAGE") {
        if (!newImage) {
          showError("새로운 이미지를 업로드해주세요.");
          return;
        }

        showConfirm(
          "업로드한 이미지로 제품 이미지가 교체됩니다.",
          async () => {
            try {
              // 이미지 신고 승인 (새 이미지 파일과 함께)
              await acceptImageReport(report.reportId, newImage);
              showSuccess("이미지가 성공적으로 교체되었습니다.");
              setTimeout(() => navigate(-1), 2000);
            } catch (error) {
              console.error("이미지 교체 오류:", error);
              showError("이미지 교체 중 오류가 발생했습니다.");
            }
          },
          "이미지 교체를 승인하시겠습니까?",
        );
      }
    } catch {
      showError("처리 중 오류가 발생했습니다.");
    }
  };

  const handleRejectReport = async () => {
    if (!report) return;

    showConfirm(
      "신고가 거부되며 되돌릴 수 없습니다.",
      async () => {
        try {
          await rejectReport(report.reportId);
          showSuccess("신고가 거부되었습니다.");
          setTimeout(() => navigate(-1), 2000);
        } catch {
          showError("신고 거부 중 오류가 발생했습니다.");
        }
      },
      "신고를 거부하시겠습니까?",
    );
  };

  // 이미지 업로드 컴포넌트
  const ImageUpload: React.FC = () => {
    return (
      <div className="relative bg-gray-100 aspect-square">
        {newImagePreview ? (
          <div className="w-full h-full relative">
            <img
              src={newImagePreview}
              alt="업로드 미리보기"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => {
                setNewImage(null);
                setNewImagePreview(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-[#79CCB1] transition-colors">
            <Upload className="h-16 w-16 text-gray-400 mb-4" />
            <div className="text-center">
              <label className="cursor-pointer">
                <span className="text-[#79CCB1] hover:text-[#2D5945] font-medium text-lg">
                  이미지 업로드
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <p className="text-gray-500 text-sm mt-2">또는 이미지를 드래그하세요</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#79CCB1]"></div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">신고를 불러올 수 없습니다</h3>
        <p className="text-gray-500 mb-4">잠시 후 다시 시도해 주세요.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#79CCB1] text-white px-4 py-2 rounded-lg hover:bg-[#2D5945] cursor-pointer"
        >
          돌아가기
        </button>
      </div>
    );
  }

  const product = report.productInfo;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 이미지 배열 생성
  const getAllImages = () => {
    const images = [];
    if (product.productImage) {
      images.push(product.productImage);
    }
    if (product.infoImageUrls && product.infoImageUrls.length > 0) {
      images.push(...product.infoImageUrls);
    }
    return images;
  };

  const allImages = getAllImages();

  const handleNext = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const handlePrev = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            돌아가기
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">신고 상세 조회</h1>
          </div>
        </div>

        {/* 신고 타입별 화면 */}
        {report.reportType === "NUTRITION_UPDATE" ? (
          // 영양성분 수정 신고
          <div className="space-y-6">
            {/* 제품 정보 및 신고 정보 */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-xl text-gray-900">{product.productName}</h3>
                  <p className="text-gray-600 text-lg">{product.manufacturer}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>신고자 이름: {report.nickname}</p>
                  <p>신고 일시: {formatDate(report.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 왼쪽: 제품 이미지 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative bg-gray-100 aspect-square">
                    {allImages.length > 0 ? (
                      <>
                        <img
                          src={allImages[currentImageIndex] || "/decodeatLogo.ico"}
                          alt={`${product.productName} - ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/decodeatLogo.ico";
                          }}
                        />
                        {allImages.length > 1 && (
                          <>
                            <button
                              onClick={handlePrev}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                            >
                              ‹
                            </button>
                            <button
                              onClick={handleNext}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                            >
                              ›
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-2 py-1 rounded">
                              {currentImageIndex + 1} / {allImages.length}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src="/decodeatLogo.ico"
                          alt="No image"
                          className="w-32 h-32 opacity-50"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 가운데: 현재 영양성분 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-4 shadow-sm h-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    현재 영양성분
                  </h3>
                  {report.currentNutritionInfo && (
                    <div className="space-y-2">
                      {[
                        { label: "열량", key: "energy", unit: "kcal" },
                        { label: "탄수화물", key: "carbohydrate", unit: "g" },
                        { label: "단백질", key: "protein", unit: "g" },
                        { label: "지방", key: "fat", unit: "g" },
                        { label: "포화지방", key: "satFat", unit: "g" },
                        { label: "트랜스지방", key: "transFat", unit: "g" },
                        { label: "콜레스테롤", key: "cholesterol", unit: "mg" },
                        { label: "나트륨", key: "sodium", unit: "mg" },
                        { label: "당류", key: "sugar", unit: "g" },
                        { label: "식이섬유", key: "dietaryFiber", unit: "g" },
                        { label: "칼슘", key: "calcium", unit: "mg" },
                      ].map((item) => {
                        const value =
                          report.currentNutritionInfo?.[item.key as keyof NutritionInfo] ?? 0;
                        return (
                          <div
                            key={item.key}
                            className="flex justify-between py-1 px-2 bg-gray-50 rounded text-sm"
                          >
                            <span className="text-gray-700">{item.label}</span>
                            <span className="font-medium">
                              {value}
                              {item.unit}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* 오른쪽: 요청된 영양성분 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-4 shadow-sm h-full border-2 border-[#79CCB1]">
                  <h3 className="text-lg font-semibold text-[#2D5945] mb-4 text-center">
                    요청된 영양성분
                  </h3>
                  {report.nutritionRequestInfo && (
                    <div className="space-y-2">
                      {[
                        { label: "열량", key: "energy", unit: "kcal" },
                        { label: "탄수화물", key: "carbohydrate", unit: "g" },
                        { label: "단백질", key: "protein", unit: "g" },
                        { label: "지방", key: "fat", unit: "g" },
                        { label: "포화지방", key: "satFat", unit: "g" },
                        { label: "트랜스지방", key: "transFat", unit: "g" },
                        { label: "콜레스테롤", key: "cholesterol", unit: "mg" },
                        { label: "나트륨", key: "sodium", unit: "mg" },
                        { label: "당류", key: "sugar", unit: "g" },
                        { label: "식이섬유", key: "dietaryFiber", unit: "g" },
                        { label: "칼슘", key: "calcium", unit: "mg" },
                      ].map((item) => {
                        const currentValue =
                          report.currentNutritionInfo?.[item.key as keyof NutritionInfo] ?? 0;
                        const requestedValue =
                          report.nutritionRequestInfo?.[item.key as keyof NutritionInfo] ?? 0;
                        const isChanged = currentValue !== requestedValue;

                        return (
                          <div
                            key={item.key}
                            className={`flex justify-between py-1 px-2 rounded text-sm ${
                              isChanged ? "bg-yellow-100 border border-yellow-300" : "bg-gray-50"
                            }`}
                          >
                            <span className="text-gray-700">{item.label}</span>
                            <span className={`font-medium ${isChanged ? "text-[#2D5945]" : ""}`}>
                              {requestedValue}
                              {item.unit}
                              {isChanged && (
                                <span className="ml-1 text-xs text-orange-600">변경</span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 이미지 신고
          <div className="space-y-6">
            {/* 제품 정보 및 신고 정보 */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-xl text-gray-900">{product.productName}</h3>
                  <p className="text-gray-600 text-lg">{product.manufacturer}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>신고자 이름: {report.nickname}</p>
                  <p>신고 일시: {formatDate(report.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 왼쪽: 기존 이미지 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">현재 제품 이미지</h2>
                </div>
                <div className="relative bg-gray-100 aspect-square">
                  <img
                    src={product.productImage || "/decodeatLogo.ico"}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/decodeatLogo.ico";
                    }}
                  />
                </div>
              </div>

              {/* 오른쪽: 새 이미지 업로드 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border-2 border-[#79CCB1]">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4 text-[#2D5945]">새 이미지 업로드</h2>
                </div>
                <div className="aspect-square">
                  <ImageUpload />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleRejectReport}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
          >
            신고 거부
          </button>
          <button
            onClick={handleAcceptReport}
            className="px-6 py-3 bg-[#79CCB1] text-white rounded-lg hover:bg-[#2D5945] font-medium"
          >
            신고 승인
          </button>
        </div>
      </div>

      <MessageModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        buttons={modalState.buttons}
        onClose={hideModal}
      />
    </div>
  );
};

export default AdminReportDetail;
