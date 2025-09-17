import { useMutation } from "@tanstack/react-query";
import { API } from "../apis/axios";
import type { EnrollFormData, EnrollResponse } from "../types/enroll";
import { convertToPng } from "../utils/image";

const postEnroll = async (enrollFormData: EnrollFormData): Promise<EnrollResponse> => {
  const data = new FormData();

  // 파라미터 설정
  const params = new URLSearchParams({
    name: enrollFormData.name,
    manufacturer: enrollFormData.manufacturer,
  });

  // 상품 이미지 (선택적)
  if (enrollFormData.productImage) {
    const pngImage = await convertToPng(enrollFormData.productImage);
    data.append("productImage", pngImage);
  }

  // 표 이미지 (배열, 최소 1개)
  for (const file of enrollFormData.productInfoImages) {
    const pngImage = await convertToPng(file);
    data.append("productInfoImages", pngImage);
  }
  const res = await API.post<EnrollResponse>(`/products?${params.toString()}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (!res.data.isSuccess) {
    throw new Error(res.data.message || "제품 등록에 실패했습니다.");
  }

  return res.data;
};

export const useEnroll = () => {
  return useMutation({
    mutationFn: postEnroll,
  });
};
