import { useState } from 'react';
import { useFilterStore } from '../../store/useStore';

const LeftGNB = () => {
  const [isLivingRoomOpen, setIsLivingRoomOpen] = useState(true);
  const { checkedItems, toggleFilter } = useFilterStore();

  const categories = [
    { id: 'refined-carbohydrate', label: '정제 탄수화물', count: 697 },
    { id: 'complex-carbohydrate', label: '복합 탄수화물', count: 234 },
    { id: 'whey-protein-isolate', label: '분리유청 단백질', count: 182 },
    { id: 'whey-protein-concentrate', label: '농축유청 단백질', count: 133 },
    { id: 'plant-protein', label: '식물성 단백질', count: 24 },
    { id: 'animal-protein', label: '동물성 단백질', count: 49 },
    { id: 'soluble-dietary-fiber', label: '수용성 식이섬유', count: 75 },
    { id: 'insoluble-dietary-fiber', label: '불용성 식이섬유', count: 75 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto z-30">
      <div className="p-4 pt-20">
        <h3 className="text-lg font-medium mb-4">세부 영양소</h3>
        <div className="pb-2 mb-4">
          <div className="mb-0">
            <h4>
              <button
                className="flex items-center justify-between w-full text-xl font-medium py-2 text-left hover:bg-gray-50 rounded-lg px-2"
                type="button"
                onClick={() => setIsLivingRoomOpen(!isLivingRoomOpen)}
                aria-expanded={isLivingRoomOpen}
              >
                <span className="text-base">영양소 리스트</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isLivingRoomOpen ? 'rotate-180' : ''
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
            <div
              className={`transition-all duration-200 ${
                isLivingRoomOpen ? 'block' : 'hidden'
              }`}
            >
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
                      <span className="text-gray-700 font-medium text-sm">
                        {category.label}
                      </span>
                      <span className="text-xs text-gray-500 ml-auto">
                        {category.count}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftGNB;
