import { API } from "./axios";
import type { UserResponse } from "../types/auth";

export const authAPI = {
  // 사용자 정보 조회
  getUser: async (): Promise<UserResponse> => {
    const response = await API.get<UserResponse>("/api/user");
    return response.data;
  },

  // 로그아웃 (서버가 쿠키를 삭제함)
  logout: async (): Promise<void> => {
    await API.post("/logout");
  },
};
