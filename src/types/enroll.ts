export interface EnrollFormData {
  name: string; // 제품명
  manufacturer: string; // 회사명
  productImage?: File | null; // 제품 사진 (선택)
  productInfoImages: (File | null)[]; // 원재료/영양정보 사진 (최소 1장)
}

export interface EnrollResponse {
  id: number;
  name: string;
  manufacturer: string;
  productImageUrl?: string;
  productInfoImageUrls: string[];
  createdAt: string;
}
