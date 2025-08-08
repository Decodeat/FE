import { useState } from 'react';
import {
  createDonutChartPath,
  calculateTotal,
  CHART_CONFIG,
  type ChartDataItem,
} from '../utils/chartUtils';


const ProductDetail = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const product = {
    name: '단백질 쉐이크',
    company: '잇더핏',
    images: [
      'https://m.eatthefit.com/web/product/extra/big/202507/e182b729685f4c8f52151ae9d5de5c68.png',
      'https://mblogthumb-phinf.pstatic.net/MjAyNDA0MjRfMTM3/MDAxNzEzOTI1OTk4NjY1.aO4D680NpqgkzzsXG0AXT9s3J4oCeaJxR5wV52hgIDAg.OmnTbuKIg6SUmch57TTfI3jSyQsCa3zMUvzwxfrLLwsg.JPEG/IMG_0707.jpg?type=w800',
    ],
  };

  // 슬라이드 함수
  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };


  // 영양 성분 데이터 (임의값)
  const nutritionData: ChartDataItem[] = [
    { name: '단백질', value: 35, color: '#3B82F6' },
    { name: '탄수화물', value: 30, color: '#10B981' },
    { name: '지방', value: 15, color: '#F59E0B' },
    { name: '섬유질', value: 10, color: '#EF4444' },
    { name: '기타', value: 10, color: '#8B5CF6' },
  ];

  const ingredientList = [
    { name: '정제 탄수화물', color: 'bg-blue-500' },
    { name: '복합 탄수화물', color: 'bg-green-500' },
    { name: '분리유청 단백질', color: 'bg-blue-600' },
    { name: '농축유청 단백질', color: 'bg-blue-700' },
    { name: '식물성 단백질', color: 'bg-purple-500' },
  ];

  // 원형 그래프 SVG 컴포넌트
  const DonutChart = ({ data }: { data: ChartDataItem[] }) => {
    const total = calculateTotal(data);
    let cumulativePercentage = 0;

    return (
      <div className="flex items-center space-x-6">
        <div className="relative">
          <svg
            width={CHART_CONFIG.DEFAULT_WIDTH}
            height={CHART_CONFIG.DEFAULT_HEIGHT}
            viewBox={CHART_CONFIG.DEFAULT_VIEWBOX}
          >
            {data.map((item, index) => {
              const percentage = item.value / total;
              const path = createDonutChartPath(
                percentage,
                cumulativePercentage
              );
              cumulativePercentage += percentage;

              return (
                <path
                  key={index}
                  d={path}
                  fill={item.color}
                  stroke="white"
                  strokeWidth={CHART_CONFIG.STROKE_WIDTH}
                />
              );
            })}
            {/* 중앙 원 */}
            <circle
              cx={CHART_CONFIG.DEFAULT_CENTER_X}
              cy={CHART_CONFIG.DEFAULT_CENTER_Y}
              r={CHART_CONFIG.DEFAULT_INNER_RADIUS}
              fill="white"
            />
            <text
              x="50"
              y="48"
              textAnchor="middle"
              fontSize="8"
              fill="#374151"
              fontWeight="bold"
            >
              영양성분
            </text>
            <text x="50" y="56" textAnchor="middle" fontSize="6" fill="#6B7280">
              비율
            </text>
          </svg>
        </div>

        {/* 범례 */}
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xl text-gray-600">{item.name}</span>
              <span className="text-xl font-medium text-gray-900">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-5 py-5 mt-7 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4 mx-7 my-7 ">
            {/* Main Image */}
            {/* 이미지 슬라이드 영역 */}
            <div className="relative bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
              <img
                src={product.images[currentImageIndex]}
                alt={`상품 이미지 ${currentImageIndex + 1}`}
                className="w-full h-full object-contain rounded"
              />

              {/* ← 이전 버튼 */}
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 
             bg-white/70 border border-gray-300 
             rounded-full w-8 h-8 
             flex items-center justify-center 
             hover:bg-white transition"
              >
                {'<'}
              </button>

              {/* → 다음 버튼 */}
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 
             bg-white/70 border border-gray-300 
             rounded-full w-8 h-8 
             flex items-center justify-center 
             hover:bg-white transition"
              >
                {'>'}
              </button>
            </div>

          </div>

          {/* Product Details */}
          <div className="space-y-2">
            {/* 회사명 */}
            <div className="flex items-center mt-6">
              <span className="text-xl font-semibold text-[#2D5945]">{product.company}</span>
            </div>
            {/* 상품명 */}
            <div className="hidden md:block">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
            </div>
            {/* 밑줄 추가 */}
            <div className="w-full h-2 rounded mb-6" style={{ backgroundColor: '#dfe9df' }}></div>
            {/* Nutrition Chart */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                영양 성분 비율
              </h3>
              <DonutChart data={nutritionData} />
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">주요 성분</h3>
              <ul className="space-y-2 text-gray-600 ml-3">
                {ingredientList.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-3 ${item.color}`}></span>
                     <span className="text-xl text-gray-600">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
