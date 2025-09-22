import { useState } from "react";
import { useFilterStore } from "../../store/useStore";
import type { ProductCategory } from "../../types/product";

const LeftGNB = () => {
  const [isLivingRoomOpen, setIsLivingRoomOpen] = useState(true);
  const { checkedItems, toggleFilter } = useFilterStore();

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

  return (
    <aside className="fixed left-0 top-20 w-64 h-[calc(100vh-5rem)] overflow-y-auto z-30 bg-white border-r border-gray-200">
      <div className="pr-4 pl-4">
        <div className="mb-0">
          <h4>
            <button
              className="flex items-center justify-between w-full text-xl font-medium py-2 text-left hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
              type="button"
              onClick={() => setIsLivingRoomOpen(!isLivingRoomOpen)}
              aria-expanded={isLivingRoomOpen}
            >
              <span className="text-lg font-bold text-[#2D5945]">세부 영양소 리스트</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isLivingRoomOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </h4>
          <div className={`transition-all duration-200 ${isLivingRoomOpen ? "block" : "hidden"}`}>
            <div className="py-1 mb-1 ml-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center mb-2 hover:bg-gray-50 rounded-lg p-2"
                >
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    type="checkbox"
                    id={category.id}
                    checked={checkedItems[category.id] || false}
                    onChange={() => toggleFilter(category.id)}
                  />
                  <label
                    className="flex items-center justify-between w-full ml-2 cursor-pointer"
                    htmlFor={category.id}
                  >
                    <span className="text-gray-700 font-medium text-sm">{category.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftGNB;
