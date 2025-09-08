import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "../apis/productDetail";

// 제품 상세 정보 조회 훅
export const useProductDetail = (productId: number) => {
  return useQuery({
    queryKey: ["product", "detail", productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10분간 캐시 유지
    gcTime: 30 * 60 * 1000, // 30분간 가비지 컬렉션 방지
  });
};
