import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 자동 포함
});

// 요청 인터셉터 (디버깅용)
API.interceptors.request.use(
  (config) => {
    console.log('API 요청:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      withCredentials: config.withCredentials
    });
    console.log('현재 쿠키:', document.cookie);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리용)
API.interceptors.response.use(
  (response) => {
    console.log('API 응답 성공:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API 에러:', {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method
      }
    });
    return Promise.reject(error);
  },
);
