import ProductGrid from "../components/search/ProductGrid.tsx";
import SearchBanner from "../components/search/SearchBanner";

const HomePage = () => {
  return (
    <div>
      {/* 배너는 전체 너비 */}
      <SearchBanner />

      {/* 아래 콘텐츠는 패딩 적용 */}
      <div className="px-4 md:px-6 lg:px-8">
        <section className="pt-8">
          <ProductGrid />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
