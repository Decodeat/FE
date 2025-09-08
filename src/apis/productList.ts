import { API } from "./axios";
import type { LatestProductsResponse, LatestProductsParams } from "../types/productList";

// 홈화면용 최신순 제품 조회
export const getLatestProducts = async (
  params?: LatestProductsParams,
): Promise<LatestProductsResponse> => {
  // cursorId가 있으면 쿼리 파라미터로 추가
  const searchParams = new URLSearchParams();
  if (params?.cursorId) {
    searchParams.append("cursorId", params.cursorId.toString());
  }

  const queryString = searchParams.toString();
  const url = `/products/latest${queryString ? `?${queryString}` : ""}`;

  const response = await API.get<LatestProductsResponse>(url);

  if (!response.data.isSuccess) {
    throw new Error(response.data.message || "최신 제품 조회에 실패했습니다.");
  }

  return response.data;
};
