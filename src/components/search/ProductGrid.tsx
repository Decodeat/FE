import { useState, useEffect, useCallback } from 'react';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  image: string;
  isPopular: boolean;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 샘플 제품 데이터
  const generateProducts = (startIndex: number, count: number): Product[] => {
    const productNames = [
      '분리유청 단백질 파우더',
      '복합 탄수화물 보충제',
      '식물성 단백질 바',
      '수용성 식이섬유 드링크',
      '농축유청 단백질',
      '동물성 단백질 스낵',
      '불용성 식이섬유 캡슐',
      '정제 탄수화물 젤리',
    ];

    const brands = ['뉴트리원', '헬스플러스', '바이탈케어', '웰니스랩'];
    const badges = ['Sale', 'New', null];

    return Array.from({ length: count }, (_, i) => ({
      id: startIndex + i,
      name: productNames[i % productNames.length],
      brand: brands[i % brands.length],
      price: Math.floor(Math.random() * 50000) + 10000,
      originalPrice:
        Math.random() > 0.5 ? Math.floor(Math.random() * 70000) + 30000 : null,
      badge: badges[i % badges.length],
      image: `https://via.placeholder.com/226x200/f3f4f6/6b7280?text=Product+${
        startIndex + i
      }`,
      isPopular: Math.random() > 0.7,
    }));
  };

  // 초기 데이터 로드
  useEffect(() => {
    setLoading(true);
    // API 호출 시뮬레이션
    setTimeout(() => {
      const initialProducts = generateProducts(1, 12);
      setProducts(initialProducts);
      setLoading(false);
    }, 500);
  }, []);

  // 더 많은 제품 로드
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    // API 호출 시뮬레이션
    setTimeout(() => {
      const newProducts = generateProducts(products.length + 1, 12);
      setProducts((prev) => [...prev, ...newProducts]);
      setPage((prev) => prev + 1);

      // 5페이지 이후에는 더 이상 로드하지 않음
      if (page >= 5) {
        setHasMore(false);
      }

      setLoading(false);
    }, 1000);
  }, [loading, hasMore, products.length, page]);

  // 무한 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <div className="w-full">
      {/* 검색 결과 헤더 */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-2">영양소 제품</h2>
          <p className="text-gray-600 text-sm">
            총 {products.length}개의 제품을 찾았습니다
          </p>
        </div>

        {/* 정렬 옵션 */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm whitespace-nowrap">정렬:</span>
          <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="popular">인기순</option>
            <option value="low-high">낮은 가격순</option>
            <option value="high-low">높은 가격순</option>
            <option value="rating">평점순</option>
            <option value="newest">최신순</option>
          </select>
        </div>
      </div>

      {/* 제품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            {/* 제품 이미지 */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            {/* 제품 정보 */}
            <div className="p-4">
              <div className="mb-2">
                <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500">{product.brand}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">로딩 중...</span>
        </div>
      )}

      {/* 더 이상 로드할 제품이 없을 때 */}
      {!hasMore && products.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">모든 제품을 불러왔습니다.</p>
        </div>
      )}

      {/* 제품이 없을 때 */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ShoppingCart className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            제품이 없습니다
          </h3>
          <p className="text-gray-500">다른 검색어나 필터를 시도해보세요.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
