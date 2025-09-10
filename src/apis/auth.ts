import { API } from "./axios";
import type { UserResponse, RefreshTokenRequest, RefreshTokenResponse } from "../types/auth";

export const authAPI = {
  // 사용자 정보 조회
  getUser: async (): Promise<UserResponse> => {
    const response = await API.get<UserResponse>("/user");
    return response.data;
  },

  // 토큰 갱신
  refreshToken: async (refreshTokenValue: string): Promise<RefreshTokenResponse> => {
    const response = await API.post<RefreshTokenResponse>("/token", {
      refreshToken: refreshTokenValue,
    } as RefreshTokenRequest);
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    await API.post("/logout");
  },
};
