import type { ApiResponse } from "./common";

// 좋아요한 상품 아이템 타입
export interface LikedProduct {
  productId: number;
  manufacturer: string;
  productName: string;
  productImage: string;
}

// 좋아요한 상품 목록 결과 타입
export interface LikedProductsResult {
  content: LikedProduct[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

// 좋아요한 상품 목록 응답 타입
export type LikedProductsResponse = ApiResponse<LikedProductsResult>;

// 좋아요한 상품 목록 파라미터
export interface LikedProductsParams {
  page?: number;
  size?: number;
}
