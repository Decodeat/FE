import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload } from "lucide-react";
import { useAdminReportDetail } from "../../hooks/useAdminReportDetail";
import { useMessageModal } from "../../hooks/useMessageModal";
import MessageModal from "../ui/MessageModal";
import { acceptNutritionReport, acceptImageReport, rejectReport } from "../../apis/adminReports";
import type { NutritionInfo, ReportItem, ReportListResult, ReportStatus } from "../../types/report";

const AdminReportDetail: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    data: report,
    isLoading,
    error,
  } = useAdminReportDetail({
    reportId: Number(reportId!),
  });

  const { modalState, showSuccess, showError, showConfirm, hideModal } = useMessageModal();

  // 드래그 앤 드롭 및 클립보드 이벤트 처리
  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes("Files")) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      if (e.clientX === 0 && e.clientY === 0) {
        setIsDragging(false);
      }
    };

    const handleDrop = () => setIsDragging(false);

    // 클립보드 붙여넣기 이벤트 처리
    const handlePaste = (e: ClipboardEvent) => {
      if (report?.reportType !== "INAPPROPRIATE_IMAGE") return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            setNewImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
              setNewImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            showSuccess("클립보드에서 이미지가 추가되었습니다!");
          }
          break;
        }
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("paste", handlePaste);
    };
  }, [report, showSuccess]);

  // 제품 상세 페이지로 이동
  const handleProductImageClick = () => {
    if (report?.productInfo?.productId) {
      navigate(`/detail/${report.productInfo.productId}`);
    }
  };

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

    // 낙관적 업데이트: 즉시 UI 상태 변경
    const updateReportStatus = (newStatus: ReportStatus) => {
      // 신고 리스트 캐시 업데이트
      queryClient.setQueriesData(
        { queryKey: ["adminReports"] },
        (oldData: ReportListResult | undefined) => {
          if (!oldData || !oldData.reportList) return oldData;

          return {
            ...oldData,
            reportList: oldData.reportList.map((item: ReportItem) =>
              item.reportId === report.reportId ? { ...item, reportStatus: newStatus } : item,
            ),
          };
        },
      );

      // 신고 상세 캐시 업데이트
      queryClient.setQueryData(
        ["adminReportDetail", report.reportId],
        (oldData: ReportItem | undefined) => {
          if (!oldData) return oldData;
          return { ...oldData, reportStatus: newStatus };
        },
      );
    };

    try {
      if (report.reportType === "NUTRITION_UPDATE") {
        showConfirm(
          "사용자가 요청한 영양성분 정보로 업데이트됩니다.",
          async () => {
            try {
              // 낙관적 업데이트 적용
              updateReportStatus("ACCEPTED" as ReportStatus);

              await acceptNutritionReport(report.reportId);
              showSuccess("영양성분이 성공적으로 수정되었습니다.");
              setTimeout(() => navigate(-1), 2000);
            } catch {
              // 실패 시 캐시 되돌리기
              queryClient.invalidateQueries({ queryKey: ["adminReports"] });
              queryClient.invalidateQueries({ queryKey: ["adminReportDetail", report.reportId] });
              showError("영양성분 수정 중 오류가 발생했습니다.");
            }
          },
          "영양성분 수정을 승인하시겠습니까?",
        );
      } else if (report.reportType === "INAPPROPRIATE_IMAGE") {
        const confirmMessage = newImage
          ? "업로드한 이미지로 제품 이미지가 교체됩니다."
          : "부적절한 이미지가 삭제됩니다.";

        const successMessage = newImage
          ? "이미지가 성공적으로 교체되었습니다."
          : "부적절한 이미지가 성공적으로 삭제되었습니다.";

        showConfirm(
          confirmMessage,
          async () => {
            try {
              // 낙관적 업데이트 적용
              updateReportStatus("ACCEPTED" as ReportStatus);

              // 이미지 신고 승인 (새 이미지가 있으면 첨부, 없으면 빈 FormData)
              await acceptImageReport(report.reportId, newImage || undefined);
              showSuccess(successMessage);
              setTimeout(() => navigate(-1), 2000);
            } catch (error) {
              // 실패 시 캐시 되돌리기
              queryClient.invalidateQueries({ queryKey: ["adminReports"] });
              queryClient.invalidateQueries({ queryKey: ["adminReportDetail", report.reportId] });
              console.error("이미지 처리 오류:", error);
              showError("이미지 처리 중 오류가 발생했습니다.");
            }
          },
          "이미지 신고를 승인하시겠습니까?",
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
          // 낙관적 업데이트: 즉시 UI 상태 변경
          // 신고 리스트 캐시 업데이트
          queryClient.setQueriesData(
            { queryKey: ["adminReports"] },
            (oldData: ReportListResult | undefined) => {
              if (!oldData || !oldData.reportList) return oldData;

              return {
                ...oldData,
                reportList: oldData.reportList.map((item: ReportItem) =>
                  item.reportId === report.reportId
                    ? { ...item, reportStatus: "REJECTED" as ReportStatus }
                    : item,
                ),
              };
            },
          );

          // 신고 상세 캐시 업데이트
          queryClient.setQueryData(
            ["adminReportDetail", report.reportId],
            (oldData: ReportItem | undefined) => {
              if (!oldData) return oldData;
              return { ...oldData, reportStatus: "REJECTED" as ReportStatus };
            },
          );

          await rejectReport(report.reportId);
          showSuccess("신고가 거부되었습니다.");
          setTimeout(() => navigate(-1), 2000);
        } catch {
          // 실패 시 캐시 되돌리기
          queryClient.invalidateQueries({ queryKey: ["adminReports"] });
          queryClient.invalidateQueries({ queryKey: ["adminReportDetail", report.reportId] });
          showError("신고 거부 중 오류가 발생했습니다.");
        }
      },
      "신고를 거부하시겠습니까?",
    );
  };

  // 이미지 업로드 컴포넌트
  const ImageUpload: React.FC = () => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
          setNewImage(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setNewImagePreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      // 컴포넌트 경계를 벗어날 때만 isDragging을 false로 설정
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsDragging(false);
      }
    };

    return (
      <div
        className="relative bg-gray-100 aspect-square"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
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
          <div
            className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed transition-colors ${
              isDragging
                ? "border-[#2D5945] bg-[#D2EDE4]"
                : "border-gray-300 hover:border-[#79CCB1]"
            }`}
          >
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
              <p className="text-gray-500 text-sm mt-2">
                {isDragging
                  ? "이미지를 놓아주세요"
                  : "또는 이미지를 드래그하거나 Ctrl+V로 붙여넣으세요"}
              </p>
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
                  <div
                    className="relative bg-gray-100 aspect-square cursor-pointer"
                    onClick={handleProductImageClick}
                  >
                    {allImages.length > 0 ? (
                      <>
                        <img
                          src={allImages[currentImageIndex] || "/gyul.png"}
                          alt={`${product.productName} - ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/gyul.png";
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
                        <img src="/gyul.png" alt="No image" className="w-32 h-32 opacity-50" />
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
                <div
                  className="relative bg-gray-100 aspect-square cursor-pointer"
                  onClick={handleProductImageClick}
                >
                  <img
                    src={product.productImage || "/gyul.png"}
                    alt={product.productName}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/gyul.png";
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
