import type { EnrollFormData, EnrollResponse } from "../types/enroll";
import { API } from "./axios";

export const enrollProduct = async (data: EnrollFormData): Promise<EnrollResponse> => {
  try {
    //폼데이터 생성
    const formData = new FormData();
    //파라미터 생성
    const params = new URLSearchParams({
      name: data.name,
      manufacturer: data.manufacturer,
    });
    //제품 이미지 추가
    if (data.productImage) {
      formData.append("productImage", data.productImage);
    }
    //표 이미지 추가
    data.productInfoImages.forEach((file) => {
      formData.append("productInfoImages", file);
    });
    //API 요청
    const response = await API.post(`/products?${params.toString()}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data.isSuccess) {
      throw new Error(response.data.message || "제품 등록에 실패했습니다.");
    }

    return response.data;
  } catch (error) {
    console.error("Product enroll error:", error);
    throw error;
  }
};
