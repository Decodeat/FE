import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleProductLike } from '../apis/like';
import type { Product } from '../types/product';

export const useLikeMutation = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleProductLike(productId),
    onMutate: async () => {
      // 낙관적 업데이트: 즉시 UI 업데이트
      
      // 상품 리스트 캐시 업데이트 (검색 결과)
      queryClient.setQueriesData(
        { queryKey: ['products'] },
        (oldData: unknown) => {
          if (!oldData) return oldData;
          
          // 검색 결과 페이지네이션 형태인 경우
          if (typeof oldData === 'object' && oldData !== null && 'pages' in oldData) {
            const paginatedData = oldData as { pages: unknown[] };
            return {
              ...paginatedData,
              pages: paginatedData.pages.map((page: unknown) => {
                if (typeof page === 'object' && page !== null && 'result' in page) {
                  const pageData = page as { result: { content: Product[] } };
                  return {
                    ...pageData,
                    result: {
                      ...pageData.result,
                      content: pageData.result.content.map((product: Product) =>
                        product.productId === productId
                          ? { ...product, liked: !product.liked }
                          : product
                      ),
                    },
                  };
                }
                return page;
              }),
            };
          }
          
          // 일반 배열 형태인 경우
          if (Array.isArray(oldData)) {
            return oldData.map((product: Product) =>
              product.productId === productId
                ? { ...product, liked: !product.liked }
                : product
            );
          }
          
          return oldData;
        }
      );

      // 상품 상세 캐시 업데이트
      queryClient.setQueryData(
        ['productDetail', productId],
        (oldData: unknown) => {
          if (!oldData || typeof oldData !== 'object' || oldData === null) return oldData;
          if ('result' in oldData) {
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
        }
      );
    },
    onError: (error) => {
      // 에러 발생 시 롤백
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['productDetail', productId] });
      console.error('좋아요 처리 중 오류 발생:', error);
    },
    onSettled: () => {
      // 완료 후 관련 쿼리 갱신
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['productDetail', productId] });
    },
  });
};