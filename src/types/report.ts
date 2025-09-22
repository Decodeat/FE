import type { ApiResponse, PaginationInfo } from "./common";

// 영양성분 정보 타입 (신고 요청과 관리자용 공통)
export interface NutritionInfo {
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

// 영양성분 신고 요청 타입 (NutritionInfo와 동일)
export type NutritionReportRequest = NutritionInfo;

// 영양성분 신고 응답 타입
export type NutritionReportResponse = ApiResponse<{ reportId: number }>;

// 잘못된 이미지 신고 요청 타입
export interface ImageReportRequest {
  productId: number;
  imageUrl: string;
}

// 잘못된 이미지 신고 응답 타입
export type ImageReportResponse = ApiResponse<ImageReportRequest>;

// 제품 정보 타입 (관리자용)
export interface ProductInfo {
  productId: number;
  productName: string;
  manufacturer: string;
  productImage: string;
  infoImageUrls: string[];
}

// 신고 상태 타입
export type ReportStatus = "IN_PROGRESS" | "ACCEPTED" | "REJECTED";

// 신고 타입
export type ReportType = "NUTRITION_UPDATE" | "INAPPROPRIATE_IMAGE";

// 신고 아이템 타입
export interface ReportItem {
  reportId: number;
  reporterId: number;
  nickname: string;
  productInfo: ProductInfo;
  reportType: ReportType;
  reportStatus: ReportStatus;
  createdAt: string;
  imageUrl?: string;
  nutritionRequestInfo?: NutritionInfo;
  currentNutritionInfo?: NutritionInfo;
}

// 신고 리스트 응답 타입
export interface ReportListResult extends PaginationInfo {
  reportList: ReportItem[];
}

export type ReportListResponse = ApiResponse<ReportListResult>;

// 신고 상세 응답 타입
export type ReportDetailResponse = ApiResponse<ReportItem>;

// 신고 상태 텍스트 변환 함수
export const getReportStatusText = (status: ReportStatus): string => {
  switch (status) {
    case "IN_PROGRESS":
      return "진행중";
    case "ACCEPTED":
      return "완료";
    case "REJECTED":
      return "거부됨";
    default:
      return "알 수 없음";
  }
};

// 신고 상태 색상 변환 함수
export const getReportStatusColor = (status: ReportStatus): string => {
  switch (status) {
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-800";
    case "ACCEPTED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// 신고 타입 텍스트 변환 함수
export const getReportTypeText = (type: ReportType): string => {
  switch (type) {
    case "NUTRITION_UPDATE":
      return "영양정보 수정";
    case "INAPPROPRIATE_IMAGE":
      return "이미지 신고";
    default:
      return "알 수 없음";
  }
};
