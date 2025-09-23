import { useMutation } from "@tanstack/react-query";
import { API } from "../apis/axios";
import type { EnrollFormData, EnrollResponse } from "../types/enroll";
import { compressAndResizeImage } from "../utils/image";

const postEnroll = async (enrollFormData: EnrollFormData): Promise<EnrollResponse> => {
  const data = new FormData();

  // 파라미터 설정
  const params = new URLSearchParams({
    name: enrollFormData.name,
    manufacturer: enrollFormData.manufacturer,
  });

  // 상품 이미지 (선택적)
  if (enrollFormData.productImage) {
    const compressedImage = await compressAndResizeImage(
      enrollFormData.productImage,
      1920,
      1920,
      0.8,
    );
    data.append("productImage", compressedImage);
  }

  // 표 이미지 (배열, 최소 1개) - 영양 정보는 더 높은 해상도와 품질 유지
  for (const file of enrollFormData.productInfoImages) {
    const compressedImage = await compressAndResizeImage(file, 2560, 2560, 0.9);
    data.append("productInfoImages", compressedImage);
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
