import { API } from "./axios";
import type { NutritionReportRequest, NutritionReportResponse } from "../types/report";

// 영양성분 수정 신고
export const reportNutritionInfo = async (
  productId: number,
  data: NutritionReportRequest,
): Promise<NutritionReportResponse> => {
  const response = await API.post<NutritionReportResponse>(
    `/reports/nutrition-info?productId=${productId}`,
    data,
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message || "신고 전송에 실패했습니다.");
  }

  return response.data;
};
