import type { ApiResponse } from "./common";

// 영양성분 신고 요청 타입
export interface NutritionReportRequest {
  calcium: number;
  carbohydrate: number;
  cholesterol: number;
  dietaryFiber: number;
  energy: number;
  fat: number;
  protein: number;
  satFat: number;
  sodium: number;
  sugar: number;
  transFat: number;
}

// 영양성분 신고 응답 타입
export type NutritionReportResponse = ApiResponse<{ reportId: number }>;

// 잘못된 이미지 신고 요청 타입
export interface ImageReportRequest {
  productId: number;
  imageUrl: string;
}
// 잘못된 이미지 신고 응답 타입
export type ImageReportResponse = ApiResponse<ImageReportRequest>;
