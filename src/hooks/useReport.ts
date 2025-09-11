import { useMutation } from "@tanstack/react-query";
import { reportNutritionInfo, reportImage } from "../apis/report";
import type { NutritionReportRequest } from "../types/report";

// 영양성분 신고 훅
export const useNutritionReport = () => {
  return useMutation({
    mutationFn: ({ productId, data }: { productId: number; data: NutritionReportRequest }) =>
      reportNutritionInfo(productId, data),
  });
};

// 잘못된 이미지 신고 훅
export const useImageReport = () => {
  return useMutation({
    mutationFn: ({ productId, imageUrl }: { productId: number; imageUrl: string }) =>
      reportImage(productId, imageUrl),
  });
};
