import ProductGrid from "../components/search/ProductGrid.tsx";
import SearchBanner from "../components/search/SearchBanner";
import UserBehaviorRecommendation from "../components/home/UserBehaviorRecommendation";

const HomePage = () => {
  return (
    <div>
      {/* 배너는 전체 너비 */}
      <SearchBanner showFilter={false} />

      {/* 아래 콘텐츠는 패딩 적용 */}
      <div className="px-4 md:px-6 lg:px-8">
        {/* 사용자 행동 기반 추천 섹션 */}
        <UserBehaviorRecommendation />

        <section className="pt-8">
          <ProductGrid />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
