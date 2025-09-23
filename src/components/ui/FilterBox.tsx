import { useFilterStore } from "../../store/useStore";
import type { ProductCategory } from "../../types/product";

interface FilterBoxProps {
  className?: string;
}

const FilterBox = ({ className = "" }: FilterBoxProps) => {
  const { checkedItems, toggleFilter, getSelectedCount } = useFilterStore();

  // API와 매핑되는 카테고리 정의
  const categories: Array<{ id: string; label: string; apiCategory: ProductCategory }> = [
    { id: "refined-carbohydrate", label: "정제 탄수화물", apiCategory: "REFINED_CARBOHYDRATE" },
    { id: "complex-carbohydrate", label: "복합 탄수화물", apiCategory: "COMPLEX_CARBOHYDRATE" },
    { id: "plant-protein", label: "식물성 단백질", apiCategory: "PLANT_PROTEIN" },
    { id: "animal-protein", label: "동물성 단백질", apiCategory: "ANIMAL_PROTEIN" },
    { id: "allergens", label: "알레르기 유발요소", apiCategory: "ALLERGENS" },
    { id: "additives", label: "첨가물", apiCategory: "ADDITIVES" },
    { id: "others", label: "기타", apiCategory: "OTHERS" },
  ];

  const selectedCount = getSelectedCount();

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      {/* 제목과 선택된 개수 */}
      <div className="flex items-center justify-between mb-2 sm:mb-3 px-1">
        <h3 className="text-sm sm:text-base font-semibold text-[#2D5945]">세부 영양소 필터</h3>
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#2D5945]/80">{selectedCount}개 선택됨</span>
            <button
              onClick={() => {
                categories.forEach((category) => {
                  if (checkedItems[category.id]) {
                    toggleFilter(category.id);
                  }
                });
              }}
              className="text-xs text-[#2D5945]/70 hover:text-[#2D5945] underline transition-colors"
            >
              전체 해제
            </button>
          </div>
        )}
      </div>

      {/* 필터 옵션들을 2행으로 배치 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/30 shadow-sm">
        <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-2 p-1.5 sm:p-2 hover:bg-gray-50 rounded-md cursor-pointer group transition-colors"
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-[#2D5945] bg-gray-100 border-gray-300 rounded focus:ring-[#2D5945] focus:ring-2 focus:ring-offset-0 flex-shrink-0"
                checked={checkedItems[category.id] || false}
                onChange={() => toggleFilter(category.id)}
              />
              <span className="text-xs sm:text-sm text-[#2D5945] font-medium group-hover:text-[#2D5945]/80 transition-colors leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                {category.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
