import SearchProductGrid from "../components/search/SearchProductGrid";
import SearchBanner from "../components/search/SearchBanner";
import LeftGNB from "../components/gnb/LeftGNB";

const SearchPage = () => {
  return (
    <div className="min-h-screen">
      <SearchBanner onSearchComplete={() => {}} />

      {/* 검색 결과*/}
      <div className="flex w-full">
        <LeftGNB />
        <main className="ml-64 flex-1 px-4 py-8">
          <SearchProductGrid />
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
