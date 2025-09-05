// 영양성분 라벨 매핑
export const NUTRITION_LABELS: Record<string, { label: string; unit: string; color?: string }> = {
  energy: { label: "칼로리", unit: "kcal", color: "#FF6B6B" },
  carbohydrate: { label: "탄수화물", unit: "g", color: "#4ECDC4" },
  sugar: { label: "당류", unit: "g", color: "#45B7D1" },
  dietaryFiber: { label: "식이섬유", unit: "g", color: "#96CEB4" },
  fat: { label: "지방", unit: "g", color: "#FFEAA7" },
  satFat: { label: "포화지방", unit: "g", color: "#DDA0DD" },
  transFat: { label: "트랜스지방", unit: "g", color: "#F8B500" },
  cholesterol: { label: "콜레스테롤", unit: "mg", color: "#FF7675" },
  protein: { label: "단백질", unit: "g", color: "#6C5CE7" },
  sodium: { label: "나트륨", unit: "mg", color: "#FD79A8" },
  calcium: { label: "칼슘", unit: "mg", color: "#00B894" },
};
