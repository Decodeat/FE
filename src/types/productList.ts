import type { ApiResponse, CursorPagination } from "./common";

// 최신순 제품 목록 아이템 타입
export interface LatestProduct {
  productId: number;
  manufacturer: string;
  productName: string;
  productImage: string;
  decodeStatus: "COMPLETED" | "PENDING" | "FAILED";
  liked: boolean;
}

// 최신순 제품 조회 파라미터
export interface LatestProductsParams {
  cursorId?: number;
}

// 최신순 제품 목록 응답 타입
export type LatestProductsResponse = ApiResponse<CursorPagination<LatestProduct>>;

// 추천 상품 아이템 타입
export interface RecommendedProduct {
  productId: number;
  manufacturer: string;
  productName: string;
  productImage: string;
}

// 상품 기반 추천 파라미터
export interface ProductBasedRecommendationParams {
  productId: number;
  limit?: number;
}

// 상품 기반 추천 응답 타입
export type ProductBasedRecommendationResponse = ApiResponse<RecommendedProduct[]>;
