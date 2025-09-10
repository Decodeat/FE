import type { ApiResponse } from "./common";

// 사용자 정보 타입
export interface User {
  email: string;
  nickname: string;
}

// 사용자 정보 API 응답 타입 (common의 ApiResponse 재사용)
export type UserResponse = ApiResponse<User>;
