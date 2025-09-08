// 제품 등록 요청 타입
export interface EnrollFormData {
  name: string;
  manufacturer: string;
  productImage: File | null; // 선택적으로 변경
  productInfoImages: File[];
}

// 제품 등록 응답 타입
export interface EnrollResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    name: string;
    manufacturer: string;
    productImage: string;
    productInfoImages: string[];
  };
}
