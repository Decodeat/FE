import { create } from 'zustand';

interface FilterState {
  checkedItems: Record<string, boolean>;
  searchQuery: string;
  sortBy: string;
  toggleFilter: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  getSelectedFilters: () => string[];
  clearAllFilters: () => void;
}

export const useFilterStore = create<FilterState>()((set, get) => ({
  // 선택된 영양소 필터 - 일관성을 위해 모든 기본값을 false로 설정
  checkedItems: {
    'refined-carbohydrate': false,
    'complex-carbohydrate': false,
    'whey-protein-isolate': false,
    'whey-protein-concentrate': false,
    'plant-protein': false,
    'animal-protein': false,
    'soluble-dietary-fiber': false,
    'insoluble-dietary-fiber': false,
  },

  // 검색어
  searchQuery: '',

  // 정렬 방식
  sortBy: 'popular',

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

  // 모든 필터 초기화
  clearAllFilters: () =>
    set((state) => ({
      checkedItems: Object.keys(state.checkedItems).reduce(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {} as Record<string, boolean>
      ),
    })),
}));
