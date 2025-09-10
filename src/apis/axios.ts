import axios from "axios";
import { tokenManager } from "../utils/tokenManager";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터
API.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 로깅 제거 - useQuery/useMutation에서 처리
    return Promise.reject(error);
  },
);
