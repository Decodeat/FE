import type { ProductDetail } from "../types/productDetail";

// 영양성분 매핑 설정
export const NUTRITION_MAPPING = [
  { key: "carbohydrate", originalUnit: "g" as const },
  { key: "sugar", originalUnit: "g" as const },
  { key: "dietaryFiber", originalUnit: "g" as const },
  { key: "fat", originalUnit: "g" as const },
  { key: "satFat", originalUnit: "g" as const },
  { key: "transFat", originalUnit: "g" as const },
  { key: "protein", originalUnit: "g" as const },
  { key: "sodium", originalUnit: "mg" as const },
  { key: "calcium", originalUnit: "mg" as const },
  { key: "cholesterol", originalUnit: "mg" as const },
] as const;

// 단위 변환 설정
export const UNIT_CONVERSION = {
  MG_TO_G: 1000,
} as const;

// 세부 영양소 카테고리 설정
export const NUTRIENT_CATEGORIES = [
  {
    key: "animalProteins" as keyof ProductDetail,
    title: "동물성 단백질",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  {
    key: "plantProteins" as keyof ProductDetail,
    title: "식물성 단백질",
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
  },
  {
    key: "complexCarbs" as keyof ProductDetail,
    title: "복합 탄수화물",
    color: "bg-blue-600",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  {
    key: "refinedCarbs" as keyof ProductDetail,
    title: "정제 탄수화물",
    color: "bg-blue-700",
    textColor: "text-blue-800",
    bgColor: "bg-blue-50",
  },
  {
    key: "additives" as keyof ProductDetail,
    title: "첨가물",
    color: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
  },
  {
    key: "allergens" as keyof ProductDetail,
    title: "알레르기 유발 물질",
    color: "bg-orange-500",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
  },
  {
    key: "others" as keyof ProductDetail,
    title: "기타",
    color: "bg-gray-500",
    textColor: "text-gray-700",
    bgColor: "bg-gray-50",
  },
] as const;

// 차트 설정
export const CHART_CONFIG = {
  center: 120,
  radius: 100,
  strokeWidth: 2,
  svgSize: 240,
} as const;
