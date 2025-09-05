import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

// Configuration constants
const CONFIG = {
  SCROLL_OFFSET_PX: 1000,
  MAX_PAGES: 5,
  INITIAL_LOAD_COUNT: 12,
  LOAD_MORE_COUNT: 12,
  INITIAL_LOAD_DELAY: 500,
  LOAD_MORE_DELAY: 1000,
} as const;

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
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 제품 클릭 핸들러
  const handleProductClick = () => {
    // 테스트용: 모든 상품을 ID 1로 고정
    navigate(`/detail/1`);
  };

  // 샘플 제품 데이터
  const sampleProducts = [
    {
      name: "단백질 쉐이크",
      brand: "잇더핏",
      image:
        "https://m.eatthefit.com/web/product/extra/big/202507/e182b729685f4c8f52151ae9d5de5c68.png",
    },
    {
      name: "분리유청 단백질 파우더",
      brand: "뉴트리원",
      image:
        "https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/56ec/e7b427f72876491f57c9ee85fb329a93145024bfa7ce0e7285e536c6f0ce.jpg",
    },
    {
      name: "복합 탄수화물 보충제",
      brand: "헬스플러스",
      image:
        "https://image10.coupangcdn.com/image/retail/images/2018/03/12/16/0/324e1e7d-ca9a-402f-94a8-a63a2b12c435.jpg",
    },
    {
      name: "식물성 단백질 바",
      brand: "바이탈케어",
      image: "https://sitem.ssgcdn.com/58/68/78/item/1000059786858_i2_750.jpg",
    },
    {
      name: "수용성 식이섬유 드링크",
      brand: "웰니스랩",
      image:
        "https://media.amway.co.kr/sys-master/images/h1f/h77/9302395256862/NU_316555_2_640.jpg",
    },
    {
      name: "농축유청 단백질",
      brand: "뉴트리원",
      image: "https://m.jherb.com/web/product/big/202303/93e6a823f5dba0e62cda644cab951c02.jpg",
    },
    {
      name: "동물성 단백질 스낵",
      brand: "헬스플러스",
      image: "https://asset.m-gs.kr/prod/1087604105/1/550",
    },
    {
      name: "불용성 식이섬유 캡슐",
      brand: "스톰",
      image:
        "https://product-image.kurly.com/product/image/b807fb84-e46a-4cab-8f1f-dff06afa85ee.jpg",
    },
    {
      name: "정제 탄수화물 젤리",
      brand: "웰니스랩",
      image:
        "https://mblogthumb-phinf.pstatic.net/MjAyNDA0MTJfMTYg/MDAxNzEyOTMzNDEzNjU1.PMLn9I--dR4NiC25gQSLUqKzR1O-0VLTOziV-Rj48ZAg.aKMutYb5mILCMpfSv2mulGoO23PpZW41mzHQdZkpHj0g.JPEG/SE-d31f8382-4284-4e2b-ad53-70cc15a899c8.jpg?type=w800",
    },
    {
      name: "멀티비타민 & 미네랄",
      brand: "뉴트리원",
      image: "https://img.danawa.com/prod_img/500000/728/926/img/6926728_1.jpg?_v=20250311101842",
    },
    {
      name: "오메가3 캡슐",
      brand: "헬스플러스",
      image:
        "https://imgproxy.pillyze.io/egjPRqRifm62O2ClNyMoNHwiRgG6_KMTKsVm5V-w9gw/rs:fill:500:500/czM6Ly9waWxseXplLXByZC1pbWFnZS9wcm9kdWN0cy92MS8xay9mMmE2MzhhMS0xNjc4LzEwMDA",
    },
    {
      name: "프로바이오틱스 파우더",
      brand: "바이탈케어",
      image: "https://m.media-amazon.com/images/I/71S7dvct+ML._AC_SL1500_.jpg",
    },
    {
      name: "콜라겐 펩타이드 드링크",
      brand: "웰니스랩",
      image: "https://s.alicdn.com/@sc04/kf/H2dd74b0359ce4793bf0a83d25954002cn.jpg",
    },
  ];

  const badges = ["Sale", "New", null] as const;

  // 제품 생성 함수
  const generateProducts = (startIndex: number, count: number): Product[] => {
    return Array.from({ length: count }, (_, i) => {
      const productData = sampleProducts[i % sampleProducts.length]; // 순환
      return {
        id: startIndex + i,
        name: productData.name,
        brand: productData.brand,
        price: Math.floor(Math.random() * 50000) + 10000, // 1~5만원 랜덤
        originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 70000) + 30000 : null, // 3~10만원 랜덤 or null
        badge: badges[i % badges.length] ?? null,
        image: productData.image,
        isPopular: Math.random() > 0.7, // 30% 확률 인기상품
      };
    });
  };

  // 모의 API 호출 함수
  const mockFetchProducts = useCallback(
    (
      startIndex: number,
      count: number,
      delay: number = CONFIG.INITIAL_LOAD_DELAY,
    ): Promise<Product[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(generateProducts(startIndex, count));
        }, delay);
      });
    },
    [],
  );

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialProducts = async () => {
      setLoading(true);
      try {
        const initialProducts = await mockFetchProducts(1, CONFIG.INITIAL_LOAD_COUNT);
        setProducts(initialProducts);
      } catch (error) {
        console.error("Failed to fetch initial products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, [mockFetchProducts]);

  // 더 많은 제품 로드
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newProducts = await mockFetchProducts(
        products.length + 1,
        CONFIG.LOAD_MORE_COUNT,
        CONFIG.LOAD_MORE_DELAY,
      );
      setProducts((prev) => [...prev, ...newProducts]);
      setPage((prev) => prev + 1);

      // maxPages 페이지 이후에는 더 이상 로드하지 않음
      if (page >= CONFIG.MAX_PAGES) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, products.length, page, mockFetchProducts]);

  // 무한 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - CONFIG.SCROLL_OFFSET_PX
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div className="w-full">
      {/* 검색 결과 헤더 */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#2D5945] mb-2">영양소 제품</h2>
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
            className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            onClick={() => handleProductClick()} //product.id 넣기
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">제품이 없습니다</h3>
          <p className="text-gray-500">다른 검색어나 필터를 시도해보세요.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
