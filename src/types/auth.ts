import type { ApiResponse } from "./common";

// 사용자 정보 타입
export interface User {
  email: string;
  nickname: string;
}

// 사용자 정보 API 응답 타입
export type UserResponse = ApiResponse<User>;

// 토큰 갱신 요청 타입
export interface RefreshTokenRequest {
  refreshToken: string;
}

// 토큰 갱신 응답 타입
export interface RefreshTokenResult {
  accessToken: string;
}

export type RefreshTokenResponse = ApiResponse<RefreshTokenResult>;
