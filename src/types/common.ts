// 공통 API 응답 타입
export interface ApiResponse<T = unknown> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 페이지네이션 관련 공통 타입
export interface CursorPagination<T> {
  productList: T[];
  productListSize: number;
  isFirst: boolean;
  hasNext: boolean;
  nextCursorId: number | null;
}

// 페이지 기반 페이지네이션 타입
export interface PaginationInfo {
  totalPage: number;
  totalElements: number;
  isLast: boolean;
  isFirst: boolean;
}
