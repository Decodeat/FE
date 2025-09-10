import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 자동 포함
});

// 응답 인터셉터 (에러 처리용)
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
