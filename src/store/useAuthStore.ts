import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/auth";

interface AuthState {
  // 상태
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showLoginModal: boolean;

  // 액션들
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setShowLoginModal: (show: boolean) => void;
  logout: () => void;

  // 헬퍼 함수들
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user: null,
      isAuthenticated: false,
      isLoading: false,
      showLoginModal: false,

      // 사용자 설정 (로그인 성공 시)
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user, // user가 있으면 true, 없으면 false
        }),

      // 로딩 상태 설정
      setLoading: (loading) => set({ isLoading: loading }),

      // 로그인 모달 표시 상태 설정
      setShowLoginModal: (show) => set({ showLoginModal: show }),

      // 로그아웃 (상태 초기화)
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          showLoginModal: false,
        }),

      // 헬퍼 함수들
      isAdmin: () => {
        return get().user?.role === "ADMIN";
      },
    }),
    {
      name: "auth-store", // localStorage 키 이름
      // 브라우저 재시작해도 유지할 상태만 선택
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
