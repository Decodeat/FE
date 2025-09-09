import { useMutation } from "@tanstack/react-query";
import { reportNutritionInfo } from "../apis/report";
import type { NutritionReportRequest } from "../types/report";

// 영양성분 신고 훅
export const useNutritionReport = () => {
  return useMutation({
    mutationFn: ({ productId, data }: { productId: number; data: NutritionReportRequest }) =>
      reportNutritionInfo(productId, data),
  });
};
