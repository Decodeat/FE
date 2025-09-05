import type { NutritionValue, NutrientCategory } from "../types/nutrition";
import type { ProductDetail } from "../types/product";
import { NUTRITION_LABELS } from "../constants/product";
import { NUTRITION_MAPPING, UNIT_CONVERSION, NUTRIENT_CATEGORIES } from "../constants/nutrition";

// 칼로리 정보 생성 유틸리티
export const createCalorieInfo = (product: ProductDetail) => {
  if (!product || !product.energy) return null;

  const calorieLabel = NUTRITION_LABELS.energy;
  return {
    name: calorieLabel?.label || "칼로리",
    value: product.energy,
    unit: calorieLabel?.unit || "kcal",
  };
};

// 영양성분 데이터 생성 유틸리티
export const createNutritionValues = (product: ProductDetail): NutritionValue[] => {
  return NUTRITION_MAPPING.map(({ key, originalUnit }) => {
    const productValue = product[key as keyof ProductDetail] as number;

    if (originalUnit === "mg") {
      return {
        key,
        value: (productValue || 0) / UNIT_CONVERSION.MG_TO_G,
        originalUnit,
        displayValue: productValue,
      };
    }

    return {
      key,
      value: productValue || 0,
      originalUnit,
    };
  });
};

// 세부 영양소 카테고리 생성 유틸리티
export const createNutrientCategories = (product: ProductDetail): NutrientCategory[] => {
  return NUTRIENT_CATEGORIES.map(({ key, title, color, textColor, bgColor }) => ({
    title,
    items: (product[key] as string[]) || [],
    color,
    textColor,
    bgColor,
  })).filter((category) => category.items.length > 0);
};
