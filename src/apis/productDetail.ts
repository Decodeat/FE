import type { ProductDetailResponse } from "../types/productDetail";
import { API } from "./axios";

// 제품 상세 정보 조회
export const getProductDetail = async (id: number): Promise<ProductDetailResponse> => {
  try {
    const response = await API.get(`/products/${id}`);

    if (!response.data.isSuccess) {
      throw new Error(response.data.message || "제품 정보를 불러오는데 실패했습니다.");
    }

    return response.data;
  } catch (error) {
    console.error("Product detail fetch error:", error);
    throw error;
  }
};
