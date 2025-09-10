import { useQuery } from "@tanstack/react-query";
import { productAPI } from "../apis/product";
import type { ProductSearchParams, AutocompleteParams } from "../types/product";

// 상품 검색 훅
export const useProductSearch = (params: ProductSearchParams) => {
  return useQuery({
    queryKey: ["products", "search", params],
    queryFn: () => productAPI.searchProducts(params),
    enabled: Boolean(params.productName || params.categories?.length),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    select: (data) => {
      if (data.isSuccess && data.result) {
        return data.result;
      }
      throw new Error(data.message || "상품 검색에 실패했습니다.");
    },
  });
};

// 자동완성 훅
export const useProductAutocomplete = (params: AutocompleteParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["products", "autocomplete", params.productName],
    queryFn: () => productAPI.getAutocomplete(params),
    enabled: enabled && Boolean(params.productName && params.productName.trim().length > 0),
    staleTime: 2 * 60 * 1000, // 2분간 캐시 유지
    select: (data) => {
      if (data.isSuccess && data.result) {
        return data.result;
      }
      throw new Error(data.message || "자동완성 데이터를 가져올 수 없습니다.");
    },
  });
};
