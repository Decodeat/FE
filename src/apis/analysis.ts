import { API } from "./axios";
import type { AnalysisHistoryResponse, AnalysisHistoryParams } from "../types/analysis";

// 나의 분석 요청 기록 조회
export const getAnalysisHistory = async (params: AnalysisHistoryParams = {}) => {
  const { page = 1, size = 20 } = params;

  const response = await API.get<{
    isSuccess: boolean;
    code: string;
    message: string;
    result: AnalysisHistoryResponse;
  }>(`/products/register-history`, {
    params: { page, size },
  });

  return response.data;
};
