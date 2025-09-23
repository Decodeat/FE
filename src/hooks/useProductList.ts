import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getLatestProducts, getProductBasedRecommendation } from "../apis/productList";
import type { LatestProduct, ProductBasedRecommendationParams } from "../types/productList";

// 무한스크롤용 최신 제품 조회 훅
export const useLatestProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products", "latest"],
    queryFn: async ({ pageParam }) => {
      // 첫 페이지는 pageParam이 undefined, 다음 페이지부터는 cursorId
      return await getLatestProducts(pageParam ? { cursorId: pageParam } : undefined);
    },
    getNextPageParam: (lastPage) => {
      // hasNext가 true이고 nextCursorId가 있으면 다음 페이지 존재
      return lastPage.result.hasNext && lastPage.result.nextCursorId
        ? lastPage.result.nextCursorId
        : undefined;
    },
    initialPageParam: undefined as number | undefined,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
  });
};

export const useLatestProductsList = () => {
  const query = useLatestProducts();

  // 모든 페이지의 제품들을 하나의 배열로 평면화
  const products: LatestProduct[] =
    query.data?.pages?.flatMap((page) => page.result.productList) ?? [];

  return {
    ...query,
    products, // 평면화된 제품 목록
    isEmpty: products.length === 0 && !query.isLoading,
    hasProducts: products.length > 0,
    hasNextPage: query.hasNextPage,
  };
};

// 상품 기반 추천 훅
export const useProductBasedRecommendation = (params: ProductBasedRecommendationParams) => {
  return useQuery({
    queryKey: ["products", "recommendation", "product-based", params.productId, params.limit],
    queryFn: () => getProductBasedRecommendation(params),
    enabled: !!params.productId, // productId가 있을 때만 실행
    staleTime: 10 * 60 * 1000, // 10분간 캐시 유지
    gcTime: 15 * 60 * 1000, // 15분간 가비지 컬렉션 방지
  });
};
