import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useUserBehaviorRecommendation } from "../../hooks/useProductList";
import { useLikeMutation } from "../../hooks/useLike";
import { useAuthStore } from "../../store/useAuthStore";
import type { UserBehaviorRecommendedProduct } from "../../types/productList";

// 표준 상품 카드 컴포넌트 (배경색 #D2EDE4)
const StandardProductCard = ({
  product,
  onProductClick,
}: {
  product: UserBehaviorRecommendedProduct;
  onProductClick: (productId: number) => void;
}) => {
  const displayImage = product.productImage || "/decodeatLogo.ico";
  const likeMutation = useLikeMutation(product.productId);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    likeMutation.mutate();
  };

  return (
    <div
      className="group relative bg-[#D2EDE4] border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer flex-none w-48"
      onClick={() => onProductClick(product.productId)}
    >
      {/* 제품 이미지 */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={displayImage}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/decodeatLogo.ico";
          }}
        />
      </div>

      {/* 제품 정보 */}
      <div className="p-3">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1 pr-2">
              {product.productName}
            </h3>
            <button
              onClick={handleLikeClick}
              className="p-1 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer flex-shrink-0"
              disabled={likeMutation.isPending}
            >
              <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
            </button>
          </div>
          <p className="text-xs text-gray-600">{product.manufacturer}</p>
        </div>
      </div>
    </div>
  );
};

// 일반 추천 상품 카드 컴포넌트
const RecommendedProductCard = ({
  product,
  onProductClick,
}: {
  product: UserBehaviorRecommendedProduct;
  onProductClick: (productId: number) => void;
}) => {
  const displayImage = product.productImage || "/decodeatLogo.ico";
  const likeMutation = useLikeMutation(product.productId);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    likeMutation.mutate();
  };

  return (
    <div
      className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer flex-none w-48"
      onClick={() => onProductClick(product.productId)}
    >
      {/* 제품 이미지 */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={displayImage}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/decodeatLogo.ico";
          }}
        />
      </div>

      {/* 제품 정보 */}
      <div className="p-3">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1 pr-2">
              {product.productName}
            </h3>
            <button
              onClick={handleLikeClick}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0"
              disabled={likeMutation.isPending}
            >
              <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
            </button>
          </div>
          <p className="text-xs text-gray-500">{product.manufacturer}</p>
        </div>
      </div>
    </div>
  );
};

const UserBehaviorRecommendation = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { data, isLoading, error } = useUserBehaviorRecommendation();

  const handleProductClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  // 비로그인 상태일 때 로그인 안내 표시
  if (!isAuthenticated) {
    return (
      <section className="py-8">
        <div className="text-center">
          <p className="text-gray-500">로그인하고 내게 맞는 제품을 추천받아보세요.</p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex-none w-48 bg-gray-100 rounded-lg animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-t-lg" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="text-center py-8 text-gray-500">
          <p>추천 상품을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </section>
    );
  }

  if (!data?.result || data.result.products.length === 0) {
    return null; // 추천 상품이 없으면 섹션 자체를 숨김
  }

  const { message, standardProduct, products } = data.result;

  // standardProduct는 별도로 제공되므로 직접 사용
  // products 배열에는 추천 상품들만 있음

  return (
    <section className="py-8">
      {/* 섹션 헤더 */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#2D5945] mb-2">{message}</h2>
          <p className="text-sm text-gray-600">
            최근 좋아요한 상품을 기반으로 선별된 추천 상품입니다
          </p>
        </div>
      </div>

      {/* 가로 스크롤 가능한 추천 상품 그리드 */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {/* 표준 상품 (먼저 표시) */}
        <StandardProductCard product={standardProduct} onProductClick={handleProductClick} />

        {/* 추천 상품들 */}
        {products.map((product) => (
          <RecommendedProductCard
            key={product.productId}
            product={product}
            onProductClick={handleProductClick}
          />
        ))}
      </div>

      {/* 스크롤 힌트 */}
      {products.length > 2 && (
        <p className="text-xs text-gray-400 text-center mt-2">
          ← 좌우로 스크롤하여 더 많은 상품을 확인해보세요 →
        </p>
      )}
    </section>
  );
};

export default UserBehaviorRecommendation;
