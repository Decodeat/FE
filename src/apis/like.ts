import { API } from "./axios";
import type { LikeResponse } from "../types/product";

// 상품 좋아요 추가/취소
export const toggleProductLike = async (productId: number): Promise<LikeResponse> => {
  const response = await API.post<LikeResponse>(`/products/${productId}/like`);
  return response.data;
};
