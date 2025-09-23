import { API } from "./axios";
import type { ReportListResponse, ReportDetailResponse } from "../types/report";
import { convertToPng } from "../utils/image";

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
  const formData = new FormData(); //영양성분은 빈 formData 전송
  const response = await API.patch(`/admin/reports/${reportId}/accept`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 이미지 신고 승인 (새 이미지 파일과 함께)
export const acceptImageReport = async (reportId: number, newImageFile?: File) => {
  const formData = new FormData();

  // 새 이미지가 있으면 PNG로 변환하여 추가
  if (newImageFile) {
    const pngImage = await convertToPng(newImageFile);
    formData.append("newImageUrl", pngImage);
  }

  const response = await API.patch(`/admin/reports/${reportId}/accept`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.data.isSuccess) {
    throw new Error(response.data.message || "이미지 신고 승인에 실패했습니다.");
  }

  return response.data;
}; // 신고 거부
export const rejectReport = async (reportId: number) => {
  const response = await API.patch(`/admin/reports/${reportId}/reject`);
  return response.data;
};
