// API 응답 타입
export interface ProductDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ProductDetail;
}

// 제품 상세 정보 타입
export interface ProductDetail {
  productId: number;
  name: string;
  manufacturer: string;
  productImage: string;
  imageUrl: string[];
  // 영양성분
  calcium: number;
  carbohydrate: number;
  cholesterol: number;
  dietaryFiber: number;
  energy: number;
  fat: number;
  protein: number;
  satFat: number;
  sodium: number;
  sugar: number;
  transFat: number;
  // 세부영양성분
  animalProteins: string[];
  plantProteins: string[];
  complexCarbs: string[];
  refinedCarbs: string[];
  // 첨가제, 알레르겐, 기타
  additives: string[];
  allergens: string[];
  others: string[];
}

// 영양성분 정보 타입
export interface NutritionInfo {
  label: string;
  value: number;
  unit: string;
  color?: string;
}

// 세부영양성분 그룹 타입
export interface NutrientGroup {
  title: string;
  items: string[];
  color: string;
}
