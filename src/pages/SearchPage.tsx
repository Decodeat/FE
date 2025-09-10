import SearchProductGrid from "../components/search/SearchProductGrid";

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">상품 검색</h1>
          <p className="text-gray-600 mt-2">
            원하는 상품을 검색하고 카테고리별로 필터링하세요
          </p>
        </div>
        
        <SearchProductGrid />
      </div>
    </div>
  );
};

export default SearchPage;
