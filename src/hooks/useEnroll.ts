import { useMutation } from "@tanstack/react-query";
import { API } from "../apis/axios";
import type { EnrollFormData, EnrollResponse } from "../types/enroll";

const postEnroll = async (enrollFormData: EnrollFormData): Promise<EnrollResponse> => {
  const data = new FormData();

  // 파라미터 설정
  const params = new URLSearchParams({
    name: enrollFormData.name,
    manufacturer: enrollFormData.manufacturer,
  });

  // productImage (선택)
  if (enrollFormData.productImage) {
    data.append("productImage", enrollFormData.productImage);
  }

  // productInfoImages (배열, 최소 1개)
  enrollFormData.productInfoImages.forEach((file) => {
    if (file) data.append("productInfoImages", file);
  });

  const res = await API.post<EnrollResponse>(`/products?${params.toString()}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const useEnroll = () => {
  return useMutation({
    mutationFn: postEnroll,
  });
};
