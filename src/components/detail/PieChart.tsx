import { CHART_CONFIG } from "../../constants/nutrition";
import { calculateTotal, type ChartDataItem } from "../../utils/chartUtils";

interface PieChartProps {
  data: ChartDataItem[];
}

const PieChart = ({ data }: PieChartProps) => {
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
        {data.length === 1 ? (
          // 단일 요소일 때는 전체 원을 그림
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill={data[0].color}
            stroke="white"
            strokeWidth={strokeWidth}
          />
        ) : (
          // 여러 요소일 때는 기존 로직 사용
          data.map((item, index) => {
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
          })
        )}
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

export default PieChart;
