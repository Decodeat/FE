import SearchProductGrid from "../components/search/SearchProductGrid";
import SearchBanner from "../components/search/SearchBanner";

const SearchPage = () => {
  return (
    <div className="min-h-screen">
      <SearchBanner onSearchComplete={() => {}} />

      {/* 검색 결과 - 전체 너비 활용 */}
      <main className="px-4 md:px-6 lg:px-8 py-8">
        <SearchProductGrid />
      </main>
    </div>
  );
};

export default SearchPage;
