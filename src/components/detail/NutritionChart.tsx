import type { ProductDetail } from "../../types/product";
import { NUTRITION_LABELS } from "../../constants/product";
import { createNutritionValues } from "../../utils/nutritionUtils";
import { CHART_CONFIG } from "../../constants/nutrition";
import { calculateTotal, type ChartDataItem } from "../../utils/chartUtils";

interface NutritionChartProps {
  product: ProductDetail;
}

const NutritionChart = ({ product }: NutritionChartProps) => {
  // 원형차트용 영양성분 데이터(내림차순)
  const getNutritionChartData = (): ChartDataItem[] => {
    if (!product) return [];

    const nutritionValues = createNutritionValues(product);

    return nutritionValues
      .map(({ key, value, originalUnit, displayValue }) => {
        const label = NUTRITION_LABELS[key as keyof typeof NUTRITION_LABELS];
        return {
          name: label?.label || key,
          value: value || 0, // g로 계산할 값
          displayValue: displayValue || value || 0, // 원래 단위
          color: label?.color || "#808080",
          unit: label?.unit || originalUnit,
        };
      })
      .filter((item) => item.value > 0) // 0보다 큰 값만 표시
      .sort((a, b) => b.value - a.value); // 내림차순
  };

  const nutritionData = getNutritionChartData();

  // 원형(파이) 차트 컴포넌트
  const PieChart = ({ data }: { data: ChartDataItem[] }) => {
    if (!data || data.length === 0) {
      return <div className="text-center text-gray-500">영양 성분 데이터가 없습니다.</div>;
    }

    const total = calculateTotal(data);
    const { center, radius, strokeWidth, svgSize } = CHART_CONFIG;

    let currentAngle = 0;

    return (
      <div className="flex items-center gap-8">
        {/* 원형 차트 */}
        <svg width={svgSize} height={svgSize}>
          {data.map((item, index) => {
            const percentage = item.value / total;
            const angle = percentage * 2 * Math.PI;

            const x1 = center + Math.cos(currentAngle) * radius;
            const y1 = center + Math.sin(currentAngle) * radius;
            const x2 = center + Math.cos(currentAngle + angle) * radius;
            const y2 = center + Math.sin(currentAngle + angle) * radius;

            const largeArcFlag = angle > Math.PI ? 1 : 0;

            const pathData = [
              `M ${center} ${center}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              "Z",
            ].join(" ");

            const slice = (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="white"
                strokeWidth={strokeWidth}
              />
            );

            currentAngle += angle;
            return slice;
          })}
        </svg>

        {/* 영양성분 범례 */}
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
              <div className="flex-1">
                <span className="text-lg text-gray-700 font-medium">{item.name}</span>
                <span className="text-lg text-gray-900 font-bold ml-2">
                  {item.displayValue || item.value}
                  {item.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (nutritionData.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900">영양 성분 비율</h3>
      <PieChart data={nutritionData} />
    </div>
  );
};

export default NutritionChart;
