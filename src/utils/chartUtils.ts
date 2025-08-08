// 도넛 차트 관련 유틸리티 함수들

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

/**
 * 도넛 차트의 SVG 경로를 생성합니다
 * @param percentage - 전체에서 차지하는 비율 (0-1 사이)
 * @param cumulativePercentage - 누적 비율 (0-1 사이)
 * @param centerX - 중심점 X 좌표 (기본값: 50)
 * @param centerY - 중심점 Y 좌표 (기본값: 50)
 * @param radius - 반지름 (기본값: 40)
 * @returns SVG 경로 문자열
 */
export const createDonutChartPath = (
  percentage: number,
  cumulativePercentage: number,
  centerX: number = 50,
  centerY: number = 50,
  radius: number = 40
): string => {
  const startAngle = cumulativePercentage * 360;
  const endAngle = (cumulativePercentage + percentage) * 360;

  const x1 = centerX + radius * Math.cos(((startAngle - 90) * Math.PI) / 180);
  const y1 = centerY + radius * Math.sin(((startAngle - 90) * Math.PI) / 180);
  const x2 = centerX + radius * Math.cos(((endAngle - 90) * Math.PI) / 180);
  const y2 = centerY + radius * Math.sin(((endAngle - 90) * Math.PI) / 180);

  const largeArcFlag = percentage > 0.5 ? 1 : 0;

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
};

/**
 * 차트 데이터의 총합을 계산합니다
 * @param data - 차트 데이터 배열
 * @returns 총합
 */
export const calculateTotal = (data: ChartDataItem[]): number => {
  return data.reduce((sum, item) => sum + item.value, 0);
};

/**
 * 도넛 차트의 기본 설정값들
 */
export const CHART_CONFIG = {
  DEFAULT_WIDTH: 300,
  DEFAULT_HEIGHT: 300,
  DEFAULT_VIEWBOX: '0 0 100 100',
  DEFAULT_CENTER_X: 50,
  DEFAULT_CENTER_Y: 50,
  DEFAULT_RADIUS: 40,
  DEFAULT_INNER_RADIUS: 20,
  STROKE_WIDTH: '0.5',
} as const;
