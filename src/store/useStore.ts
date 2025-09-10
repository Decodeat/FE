import { create } from "zustand";
import type { ProductCategory } from "../types/product";

interface FilterState {
  checkedItems: Record<string, boolean>;
  searchQuery: string;
  sortBy: string;
  toggleFilter: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  getSelectedFilters: () => string[];
  getSelectedProductCategories: () => ProductCategory[];
  clearAllFilters: () => void;
}

export const useFilterStore = create<FilterState>()((set, get) => ({
  // 선택된 영양소 필터 - API와 매핑되는 항목들
  checkedItems: {
    "refined-carbohydrate": false,
    "complex-carbohydrate": false,
    "plant-protein": false,
    "animal-protein": false,
    allergens: false,
    additives: false,
    others: false,
  },

  // 검색어
  searchQuery: "",

  // 정렬 방식
  sortBy: "popular",

  // 액션들
  toggleFilter: (id: string) =>
    set((state) => ({
      checkedItems: {
        ...state.checkedItems,
        [id]: !state.checkedItems[id],
      },
    })),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setSortBy: (sortBy: string) => set({ sortBy }),

  // 선택된 필터들만 가져오기
  getSelectedFilters: () => {
    const { checkedItems } = get();
    return Object.keys(checkedItems).filter((key) => checkedItems[key]);
  },

  // API용 ProductCategory 배열 반환
  getSelectedProductCategories: () => {
    const { checkedItems } = get();
    const categoryMapping: Record<string, ProductCategory> = {
      "refined-carbohydrate": "REFINED_CARBOHYDRATE",
      "complex-carbohydrate": "COMPLEX_CARBOHYDRATE",
      "plant-protein": "PLANT_PROTEIN",
      "animal-protein": "ANIMAL_PROTEIN",
      allergens: "ALLERGENS",
      additives: "ADDITIVES",
      others: "OTHERS",
    };

    return Object.keys(checkedItems)
      .filter((key) => checkedItems[key])
      .map((key) => categoryMapping[key])
      .filter(Boolean); // undefined 값 제거
  },

  // 모든 필터 초기화
  clearAllFilters: () =>
    set((state) => ({
      checkedItems: Object.keys(state.checkedItems).reduce(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
    })),
}));
