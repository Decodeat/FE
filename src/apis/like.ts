import { API } from "./axios";
import type { LikeResponse } from "../types/product";
import type { LikedProductsResponse, LikedProductsParams } from "../types/like";

// 상품 좋아요 추가/취소
export const toggleProductLike = async (productId: number): Promise<LikeResponse> => {
  const response = await API.post<LikeResponse>(`/products/${productId}/like`);
  return response.data;
};

// 내가 좋아요한 상품 목록 조회
export const getLikedProducts = async (
  params?: LikedProductsParams,
): Promise<LikedProductsResponse> => {
  const searchParams = new URLSearchParams();

  if (params?.page !== undefined) {
    searchParams.append("page", params.page.toString()); // API는 1-based, UI도 1-based
  }
  if (params?.size) {
    searchParams.append("size", params.size.toString());
  }

  const queryString = searchParams.toString();
  const url = `/products/my-like${queryString ? `?${queryString}` : ""}`;

  const response = await API.get<LikedProductsResponse>(url);

  if (!response.data.isSuccess) {
    throw new Error(response.data.message || "좋아요한 상품 조회에 실패했습니다.");
  }

  return response.data;
};
