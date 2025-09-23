import { API } from "./axios";
import type { ReportListResponse, ReportDetailResponse } from "../types/report";

// 관리자 신고 리스트 조회
export const getAdminReports = async (page = 0, size = 10): Promise<ReportListResponse> => {
  const response = await API.get(`/admin/reports`, {
    params: { page, size },
  });
  return response.data;
};

// 관리자 신고 상세 조회
export const getAdminReportDetail = async (reportId: number): Promise<ReportDetailResponse> => {
  const response = await API.get(`/admin/reports/${reportId}`);
  return response.data;
};

// 영양성분 수정 신고 승인
export const acceptNutritionReport = async (reportId: number) => {
  const response = await API.patch(`/admin/reports/${reportId}/accept`);
  return response.data;
};

// 이미지 신고 승인 (새 이미지 URL과 함께)
export const acceptImageReport = async (reportId: number, newImageUrl: string) => {
  const response = await API.patch(`/admin/reports/${reportId}/accept`, {
    newImageUrl : newImageUrl,
  });
  return response.data;
};

// 신고 거부
export const rejectReport = async (reportId: number) => {
  const response = await API.patch(`/admin/reports/${reportId}/reject`);
  return response.data;
};
