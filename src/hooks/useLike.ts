import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toggleProductLike, getLikedProducts } from "../apis/like";
import type { LatestProduct } from "../types/productList";
import type { LikedProductsParams } from "../types/like";

export const useLikeMutation = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleProductLike(productId),
    onMutate: async () => {
      // 낙관적 업데이트: 즉시 UI 업데이트

      // 상품 리스트 캐시 업데이트 (최신 제품 목록)
      queryClient.setQueriesData({ queryKey: ["products", "latest"] }, (oldData: unknown) => {
        if (!oldData) return oldData;

        // 무한 스크롤 페이지네이션 형태인 경우
        if (typeof oldData === "object" && oldData !== null && "pages" in oldData) {
          const paginatedData = oldData as {
            pages: Array<{ result: { productList: LatestProduct[] } }>;
          };
          return {
            ...paginatedData,
            pages: paginatedData.pages.map((page) => ({
              ...page,
              result: {
                ...page.result,
                productList: page.result.productList.map((product: LatestProduct) =>
                  product.productId === productId ? { ...product, liked: !product.liked } : product,
                ),
              },
            })),
          };
        }

        return oldData;
      });

      // 상품 상세 캐시 업데이트
      queryClient.setQueryData(["product", productId.toString()], (oldData: unknown) => {
        if (!oldData || typeof oldData !== "object" || oldData === null) return oldData;
        if ("result" in oldData) {
          const detailData = oldData as { result: { liked: boolean } };
          return {
            ...detailData,
            result: {
              ...detailData.result,
              liked: !detailData.result.liked,
            },
          };
        }
        return oldData;
      });
    },
    onError: (error) => {
      // 에러 발생 시 롤백
      queryClient.invalidateQueries({ queryKey: ["products", "latest"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId.toString()] });
      console.error("좋아요 처리 중 오류 발생:", error);
    },
    onSettled: () => {
      // 완료 후 관련 쿼리 갱신
      queryClient.invalidateQueries({ queryKey: ["products", "latest"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["products", "liked"] });
    },
  });
};

// 좋아요한 상품 목록 조회 훅
export const useLikedProducts = (params?: LikedProductsParams) => {
  return useQuery({
    queryKey: ["products", "liked", params?.page, params?.size],
    queryFn: () => getLikedProducts(params),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지
  });
};
