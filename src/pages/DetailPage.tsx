import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "../apis/productDetail";
import { createCalorieInfo } from "../utils/nutritionUtils";
import NutritionChart from "../components/detail/NutritionChart";
import DetailedNutrients from "../components/detail/DetailedNutrients";
import { useImageReport } from "../hooks/useReport";
import warnIcon from "../assets/icon/warn.svg";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 이미지 신고 훅
  const imageReportMutation = useImageReport();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(Number(id!)),
    enabled: !!id,
  });

  const product = response?.result;

  // 이미지 배열(제품사진->영양정보사진)
  const getAllImages = () => {
    if (!product) return [];
    const images = [];
    if (product.productImage) {
      images.push(product.productImage);
    }
    if (product.imageUrl && product.imageUrl.length > 0) {
      images.push(...product.imageUrl);
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

  // 이미지 신고 핸들러
  const handleImageReport = async () => {
    if (!product || !allImages[currentImageIndex]) return;

    try {
      await imageReportMutation.mutateAsync({
        productId: product.productId,
        imageUrl: allImages[currentImageIndex],
      });

      alert("이미지 신고가 접수되었습니다.");
    } catch (error) {
      console.error("이미지 신고 실패:", error);
      alert("신고 접수에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 칼로리 정보
  const calorieInfo = createCalorieInfo(product!);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-600">
          {error ? error.message : "상품을 찾을 수 없습니다."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-5 py-5 mt-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* 사진 영역 */}
          <div className="space-y-4 mx-7 my-7">
            {/* 신고 버튼 - 이미지 위쪽 */}
            <div className="flex justify-end mb-2">
              <button
                className="flex items-center space-x-1 cursor-pointer"
                onClick={handleImageReport}
                disabled={imageReportMutation.isPending}
              >
                <img src={warnIcon} alt="경고" className="w-4 h-4" />
                <p className="text-sm text-gray-500 m-0">
                  {imageReportMutation.isPending ? "신고 중..." : "잘못된 이미지 신고"}
                </p>
              </button>
            </div>

            {/* 초기 이미지 */}
            <div className="relative bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
              <img
                src={allImages[currentImageIndex] || "/placeholder-image.jpg"}
                alt={`상품 이미지 ${currentImageIndex + 1}`}
                className="w-full h-full object-contain rounded"
              />{" "}
              {/* 이미지 이동 버튼 */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 
                             bg-white/70 border border-gray-300 
                             rounded-full w-8 h-8 
                             flex items-center justify-center 
                             hover:bg-white transition"
                  >
                    {"<"}
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 
                             bg-white/70 border border-gray-300 
                             rounded-full w-8 h-8 
                             flex items-center justify-center 
                             hover:bg-white transition"
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 상품 디테일 */}
          <div className="space-y-2">
            {/* 회사명 */}
            {product?.manufacturer && (
              <div className="flex items-center mt-6">
                <span className="text-xl font-semibold text-[#2D5945]">{product.manufacturer}</span>
              </div>
            )}

            {/* 상품명 및 칼로리 */}
            <div className="hidden md:block">
              <div className="flex items-center justify-between mb-4">
                {product?.name && (
                  <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                )}
                {calorieInfo && (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {calorieInfo.value} {calorieInfo.unit}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 구분선 */}
            <div className="w-full h-2 rounded mb-6" style={{ backgroundColor: "#dfe9df" }} />

            {/* 영양정보 차트 */}
            <NutritionChart product={product} />
          </div>
        </div>

        {/* 세부 영양소 섹션 */}
        <DetailedNutrients product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
