import { useQuery } from "@tanstack/react-query";
import { getAnalysisHistory } from "../apis/analysis";
import type { AnalysisHistoryParams } from "../types/analysis";

export const useAnalysisHistory = (params: AnalysisHistoryParams = {}) => {
  return useQuery({
    queryKey: ["analysisHistory", params],
    queryFn: () => getAnalysisHistory(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
};
