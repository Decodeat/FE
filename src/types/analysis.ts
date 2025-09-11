export type DecodeStatus = "CANCELLED" | "COMPLETED" | "FAILED" | "PROCESSING";

export interface AnalysisRecord {
  productId: number;
  registerDate: string;
  productImage: string;
  decodeStatus: DecodeStatus;
}

export interface AnalysisHistoryResponse {
  content: AnalysisRecord[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

export interface AnalysisHistoryParams {
  page?: number;
  size?: number;
}

export const getStatusText = (status: DecodeStatus): string => {
  switch (status) {
    case "CANCELLED":
      return "부적절한 이미지";
    case "COMPLETED":
      return "분석 완료";
    case "FAILED":
      return "정보 부족";
    case "PROCESSING":
      return "분석 중";
    default:
      return "알 수 없음";
  }
};

export const getStatusColor = (status: DecodeStatus): string => {
  switch (status) {
    case "COMPLETED":
      return "text-green-600 bg-green-100";
    case "CANCELLED":
    case "FAILED":
      return "text-red-600 bg-red-100";
    case "PROCESSING":
      return "text-yellow-600 bg-yellow-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};
