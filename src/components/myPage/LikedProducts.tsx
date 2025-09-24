import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useLikedProducts } from "../../hooks/useLike";
import type { LikedProduct } from "../../types/like";

// 개별 좋아요 상품 카드 컴포넌트
const LikedProductCard = ({ product }: { product: LikedProduct }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${product.productId}`);
  };

  const displayImage = product.productImage || "/decodeatLogo.ico";

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      {/* 제품 이미지 */}
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        <img
          src={displayImage}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/decodeatLogo.ico";
          }}
        />
        {/* 좋아요 아이콘 - 항상 활성화 상태 */}
        <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1">
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
        </div>
      </div>

      {/* 제품 정보 */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{product.manufacturer}</p>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
          {product.productName}
        </h3>
      </div>
    </div>
  );
};

// 페이지네이션 컴포넌트
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-3 py-2 rounded-lg text-sm font-medium ${
            page === currentPage
              ? "bg-[#2D5945] text-white"
              : page === "..."
                ? "cursor-default"
                : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const LikedProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { data, isLoading, error } = useLikedProducts({
    page: currentPage,
    size: pageSize,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">내가 좋아요한 상품</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-t-lg" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">내가 좋아요한 상품</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">좋아요한 상품을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  const products = data?.result?.content || [];
  const totalPages = data?.result?.totalPages || 0;
  const totalElements = data?.result?.totalElements || 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">내가 좋아요한 상품</h2>
          <p className="text-sm text-gray-500 mt-1">총 {totalElements}개의 상품을 좋아요했어요</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          <span>좋아요</span>
        </div>
      </div>

      {/* 상품 목록 */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">아직 좋아요한 상품이 없어요</p>
          <p className="text-gray-400 text-sm">마음에 드는 상품에 하트를 눌러보세요!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <LikedProductCard key={product.productId} product={product} />
            ))}
          </div>

          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default LikedProducts;
