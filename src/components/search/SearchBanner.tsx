import { Search } from "lucide-react";
import { useSearchLogic } from "../../hooks/useSearch";
import FilterBox from "../ui/FilterBox";

interface SearchBannerProps {
  onSearchComplete?: () => void;
  showFilter?: boolean;
}

const SearchBanner = ({ onSearchComplete, showFilter = true }: SearchBannerProps) => {
  const {
    searchQuery,
    showAutocomplete,
    autocompleteData,
    handleSearch,
    handleAutocompleteSelect,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  } = useSearchLogic(!onSearchComplete, onSearchComplete);

  return (
    <section className="relative bg-[#D2EDE4] w-screen ml-[-50vw] left-[50%] p-4 sm:p-6 lg:p-8 text-[#2D6451] overflow-visible">
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl w-full px-4 sm:px-0">
          <h1 className="text-2xl mt-2 md:text-3xl font-bold text-[#2D5945] mb-2">
            어떤 제품이든, 궁금한 영양정보를 찾아보세요!
          </h1>
          <p className="text-xl text-gray-700 mb-6">영양 성분을 쉽고 빠르게 확인할 수 있어요.</p>

          {/* 검색바 */}
          <div className="flex gap-2 max-w-2xl mx-auto mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="원하는 영양소나 제품을 검색해보세요..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 outline-none ring-2 ring-white/50 focus:ring-white"
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              />

              {/* 자동완성 드롭다운 */}
              {showAutocomplete && autocompleteData && autocompleteData.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] max-h-60 overflow-y-auto">
                  {autocompleteData.map((item) => (
                    <button
                      key={item.productId}
                      onClick={() => handleAutocompleteSelect(item.productName)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-gray-900 cursor-pointer"
                    >
                      {item.productName}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="bg-white text-[#2D5945] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer "
            >
              검색
            </button>
          </div>

          {/* 필터 박스 */}
          {showFilter && (
            <div className="flex justify-center w-full">
              <FilterBox className="w-full" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchBanner;
