import { useState } from "react";
import {
  NUTRITION_ENCYCLOPEDIA,
  NUTRITION_CATEGORIES,
  type NutrientInfo,
} from "../constants/nutritionEncyclopedia";

const NutritionEncyclopediaPage = () => {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  // 카드 확장/축소 토글
  const toggleCard = (id: string) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen  pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 영양소 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {NUTRITION_ENCYCLOPEDIA.map((nutrient) => (
            <NutrientCard
              key={nutrient.id}
              nutrient={nutrient}
              isExpanded={expandedCards.includes(nutrient.id)}
              onToggle={() => toggleCard(nutrient.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 개별 영양소 카드 컴포넌트
const NutrientCard = ({
  nutrient,
  isExpanded,
  onToggle,
}: {
  nutrient: NutrientInfo;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const categoryInfo = NUTRITION_CATEGORIES.find((cat) => cat.name === nutrient.category);

  return (
    <div className="bg-[#D2EDE4] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* 카드 헤더 */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{nutrient.name}</h3>
              {categoryInfo && (
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color} ${categoryInfo.textColor} mt-1`}
                >
                  {nutrient.category}
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{nutrient.description}</p>
      </div>

      {/* 카드 본문 */}
      <div className="p-6 pt-0">
        {/* 주요 효능 (항상 표시) */}
        <div className="mb-4">
          <h4 className="font-semibold text-[#2D5945] mb-2 flex items-center">
            <span className="w-2 h-2 bg-[#2D5945] rounded-full mr-2"></span>
            주요 효능
          </h4>
          <div className="grid grid-cols-1 gap-1">
            {nutrient.benefits.slice(0, isExpanded ? undefined : 3).map((benefit, index) => (
              <div key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-gray-400 mr-2 mt-1">•</span>
                {benefit}
              </div>
            ))}
          </div>
          {!isExpanded && nutrient.benefits.length > 3 && (
            <p className="text-xs text-gray-500 mt-1">+{nutrient.benefits.length - 3}개 더 보기</p>
          )}
        </div>

        {/* 확장된 내용 */}
        {isExpanded && (
          <div className="space-y-4 border-t border-gray-100 pt-4">
            {/* 주요 공급원 */}
            <div>
              <h4 className="font-semibold text-[#2D5945] mb-2 flex items-center">
                <span className="w-2 h-2 bg-[#2D5945] rounded-full mr-2"></span>
                주요 공급원
              </h4>
              <div className="flex flex-wrap gap-1">
                {nutrient.sources.map((source, index) => (
                  <span key={index} className="bg-white text-gray-700 px-2 py-1 rounded text-xs">
                    {source}
                  </span>
                ))}
              </div>
            </div>

            {/* 권장 섭취량 */}
            {nutrient.recommendedIntake && (
              <div>
                <h4 className="font-semibold text-[#2D5945] mb-2 flex items-center">
                  <span className="w-2 h-2 bg-[#2D5945] rounded-full mr-2"></span>
                  권장 섭취량
                </h4>
                <p className="text-sm text-gray-600 bg-white p-2 rounded">
                  {nutrient.recommendedIntake}
                </p>
              </div>
            )}

            {/* 섭취 팁 */}
            {nutrient.tips && nutrient.tips.length > 0 && (
              <div>
                <h4 className="font-semibold text-[#2D5945] mb-2 flex items-center">
                  <span className="w-2 h-2 bg-[#2D5945] rounded-full mr-2"></span>
                  섭취 팁
                </h4>
                <div className="space-y-1">
                  {nutrient.tips.map((tip, index) => (
                    <div key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-gray-400 mr-2 mt-1">•</span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 더보기/접기 버튼 */}
        <button
          onClick={onToggle}
          className="w-full mt-4 py-2 text-sm font-medium text-[#2D5945] hover:text-white hover:bg-[#2D5945] rounded-lg transition-colors duration-200"
        >
          {isExpanded ? "접기" : "자세히 보기"}
        </button>
      </div>
    </div>
  );
};

export default NutritionEncyclopediaPage;
