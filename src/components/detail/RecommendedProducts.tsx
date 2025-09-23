import { useNavigate } from "react-router-dom";
import { useProductBasedRecommendation } from "../../hooks/useProductList";
import type { RecommendedProduct } from "../../types/productList";

interface RecommendedProductsProps {
  productId: number;
}

// 개별 추천 상품 카드 컴포넌트
const RecommendedProductCard = ({ product }: { product: RecommendedProduct }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${product.productId}`);
  };

  const displayImage = product.productImage || "/decodeatLogo.ico";

  return (
    <div
      onClick={handleClick}
      className="flex-none w-48 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* 제품 이미지 */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={displayImage}
          alt={product.productName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/decodeatLogo.ico";
          }}
        />
      </div>

      {/* 제품 정보 */}
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-1">{product.manufacturer}</p>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
          {product.productName}
        </h3>
      </div>
    </div>
  );
};

const RecommendedProducts = ({ productId }: RecommendedProductsProps) => {
  const { data, isLoading, error } = useProductBasedRecommendation({
    productId,
    limit: 10,
  });

  if (isLoading) {
    return (
      <section className="py-8 ml-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">추천 상품</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 5 }).map((_, index) => (
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
      <section className="py-8 ml-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">추천 상품</h2>
        <div className="text-center py-8 text-gray-500">
          <p>추천 상품을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </section>
    );
  }

  if (!data?.result || data.result.length === 0) {
    return (
      <section className="py-8 ml-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">추천 상품</h2>
        <div className="text-center py-8 text-gray-500">
          <p>추천할 상품이 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 ml-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">추천 상품</h2>
      <p className="text-sm text-gray-600 mb-6">
        이 상품의 영양성분과 원재료를 기반으로 선별된 추천 상품입니다
      </p>

      {/* 가로 스크롤 가능한 추천 상품 그리드 */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {data.result.map((product) => (
          <RecommendedProductCard key={product.productId} product={product} />
        ))}
      </div>

      {/* 스크롤 힌트 */}
      {data.result.length > 3 && (
        <p className="text-xs text-gray-400 text-center mt-2">
          ← 좌우로 스크롤하여 더 많은 상품을 확인해보세요 →
        </p>
      )}
    </section>
  );
};

export default RecommendedProducts;
