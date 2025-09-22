import type { ApiResponse } from "./common";

// 상품 기본 정보
export interface Product {
  productId: number;
  manufacturer: string;
  productName: string;
  productImage: string;
  liked: boolean;
}

// 자동완성용 상품 정보
export interface AutocompleteProduct {
  productId: number;
  productName: string;
}

// 페이지네이션 정보
export interface PageInfo {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

// 상품 검색 결과 (페이지네이션 포함)
export interface ProductSearchResult {
  content: Product[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

// 카테고리 타입
export type ProductCategory =
  | "ALLERGENS"
  | "ANIMAL_PROTEIN"
  | "PLANT_PROTEIN"
  | "COMPLEX_CARBOHYDRATE"
  | "REFINED_CARBOHYDRATE"
  | "ADDITIVES"
  | "OTHERS";

// API 요청 타입들
export interface ProductSearchParams {
  productName?: string;
  categories?: ProductCategory[];
  page?: number;
  size?: number;
}

export interface AutocompleteParams {
  productName: string;
}

// 좋아요 결과 타입
export interface LikeResult {
  productId: number;
  liked: boolean;
}

// API 응답 타입들
export type ProductSearchResponse = ApiResponse<ProductSearchResult>;
export type AutocompleteResponse = ApiResponse<AutocompleteProduct[]>;
export type LikeResponse = ApiResponse<LikeResult>;
