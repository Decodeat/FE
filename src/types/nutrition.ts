export interface NutritionValue {
  key: string;
  value: number;
  originalUnit: "g" | "mg";
  displayValue?: number;
}

export interface NutrientCategory {
  title: string;
  items: string[];
  color: string;
  textColor: string;
  bgColor: string;
}

export interface ChartConfig {
  center: number;
  radius: number;
  strokeWidth: number;
}
