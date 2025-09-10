import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { authAPI } from "../apis/auth";
import { useAuthStore } from "../store/useAuthStore";

export const useUser = () => {
  const { setUser, setLoading } = useAuthStore();

  const query = useQuery({
    queryKey: ["user"],
    queryFn: authAPI.getUser,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    retry: (failureCount, error: Error) => {
      // 401 Unauthorized 에러면 재시도하지 않음
      if ((error as AxiosError)?.response?.status === 401) {
        return false;
      }
      // 그 외 에러는 1번만 재시도
      return failureCount < 1;
    },
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.isSuccess && query.data.result) {
      setUser(query.data.result);
    } else if (query.isError) {
      setUser(null);
    }

    // 로딩 상태를 쿼리 상태와 동기화
    setLoading(query.isLoading);
  }, [query.isSuccess, query.isError, query.isLoading, query.data, setUser, setLoading]);

  // 수동으로 사용자 정보 새로고침하는 함수 추가
  const refreshUser = () => {
    query.refetch();
  };

  return {
    ...query,
    refreshUser, // 외부에서 호출할 수 있도록 노출
  };
};

// 로그아웃 훅
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      // 서버가 쿠키를 삭제했으므로 클라이언트 상태도 초기화
      logout();
      queryClient.clear(); // 모든 쿼리 캐시 삭제
    },
  });
};

// 토큰 갱신 훅
export const useRefreshToken = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: authAPI.refreshToken,
    onSuccess: (data) => {
      if (data.isSuccess) {
        console.log("토큰 갱신 성공:", data.result?.accessToken);
      } else {
        throw new Error(data.message || "토큰 갱신에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.error("토큰 갱신 실패:", error);
      // 갱신 실패 시 사용자 정보 초기화
      setUser(null);
    },
  });
};
