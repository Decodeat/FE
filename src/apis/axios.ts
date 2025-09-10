import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Bearer 헤더 방식 사용 시 false로 변경
});

// 토큰 갱신 중복 방지를 위한 플래그
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// 요청 인터셉터 - Authorization 헤더에 토큰 자동 추가
API.interceptors.request.use(
  (config) => {
    console.log("🔍 요청 인터셉터 실행:", config.url);

    // 쿠키에서 access_token 가져와서 Authorization 헤더에 추가 (스네이크 케이스)
    const accessToken = Cookies.get("access_token");

    console.log(
      "🍪 access_token 쿠키:",
      accessToken ? `${accessToken.substring(0, 20)}...` : "없음",
    );

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("✅ Authorization 헤더 추가됨");
    } else {
      console.log("❌ access_token 쿠키를 찾을 수 없음");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (토큰 갱신 및 에러 처리)
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 로그인 페이지에서는 토큰 갱신 시도하지 않음
    if (window.location.pathname === "/login") {
      return Promise.reject(error);
    }

    // 401 에러이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중인 경우 대기열에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return API(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 쿠키에서 리프레시 토큰 가져오기 (스네이크 케이스)
        const refreshToken = Cookies.get("refresh_token");

        if (!refreshToken) {
          console.log("❌ refresh_token 쿠키를 찾을 수 없음");
          // 리프레시 토큰이 없으면 로그인 페이지로 리다이렉트 (한 번만)
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }

        // 토큰 갱신 API 호출 (순환 참조 방지를 위해 직접 axios 사용)
        const response = await axios.post(
          `${BASE_URL}/token`,
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.data.isSuccess) {
          const newAccessToken = response.data.result.accessToken;
          processQueue(null, newAccessToken);

          // 새로운 토큰으로 원래 요청의 Authorization 헤더 업데이트
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // 원래 요청 재시도
          return API(originalRequest);
        } else {
          throw new Error("토큰 갱신 실패");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트 (한 번만)
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
