import { API } from "./axios";
import type {
  LatestProductsResponse,
  LatestProductsParams,
  ProductBasedRecommendationResponse,
  ProductBasedRecommendationParams,
  UserBehaviorRecommendationResponse,
} from "../types/productList";

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

// 상품 기반 추천 조회
export const getProductBasedRecommendation = async (
  params: ProductBasedRecommendationParams,
): Promise<ProductBasedRecommendationResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.append("productId", params.productId.toString());

  if (params.limit) {
    searchParams.append("limit", params.limit.toString());
  }

  const response = await API.get<ProductBasedRecommendationResponse>(
    `/products/recommendation/product-based?${searchParams.toString()}`,
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message || "추천 상품 조회에 실패했습니다.");
  }

  return response.data;
};

// 사용자 행동 기반 추천 조회
export const getUserBehaviorRecommendation =
  async (): Promise<UserBehaviorRecommendationResponse> => {
    const response = await API.get<UserBehaviorRecommendationResponse>(
      `/products/recommendation/user-behavior-based`,
    );

    if (!response.data.isSuccess) {
      throw new Error(response.data.message || "사용자 행동 기반 추천 조회에 실패했습니다.");
    }

    return response.data;
  };
