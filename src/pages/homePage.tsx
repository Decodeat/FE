import { Search, TrendingUp, Star, Award } from 'lucide-react';
import ProductGrid from '../components/search/ProductGrid.tsx';
import { useFilterStore } from '../store/useStore';

const HomePage = () => {
  const { searchQuery, setSearchQuery } = useFilterStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 구현
    console.log('검색어:', searchQuery);
  };

  return (
    <div className="space-y-8">
      {/* 메인 배너 */}
      <section className="relative mt-8 bg-[#79CCB1] rounded-xl p-8 text-[#2D6451] overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl font-bold mb-4">
              건강한 영양소를 찾아보세요
            </h1>
            <p className="text-xl mb-6">
              당신에게 맞는 영양소 제품을 추천해드립니다
            </p>

            {/* 검색바 */}
            <div className="flex gap-2 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="원하는 영양소나 제품을 검색해보세요..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 outline-none ring-2 ring-white/50 focus:ring-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                검색
              </button>
            </div>
          </div>
        </div>

        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-white/20 to-transparent"></div>
        </div>
      </section>

      {/* 통계 카드들 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">인기 제품</h3>
              <p className="text-sm text-gray-600">1,234개 제품</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">높은 평점</h3>
              <p className="text-sm text-gray-600">평균 4.8점</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">인증 제품</h3>
              <p className="text-sm text-gray-600">567개 제품</p>
            </div>
          </div>
        </div>
      </section>

      {/* 추천 카테고리 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">인기 카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: '단백질',
              icon: '💪',
              color: 'bg-red-50 border-red-200 text-red-700',
            },
            {
              name: '탄수화물',
              icon: '🌾',
              color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
            },
            {
              name: '식이섬유',
              icon: '🥬',
              color: 'bg-green-50 border-green-200 text-green-700',
            },
            {
              name: '비타민',
              icon: '🍊',
              color: 'bg-orange-50 border-orange-200 text-orange-700',
            },
          ].map((category, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${category.color}`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 추천 제품 그리드 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">추천 제품</h2>
          <button className="text-emerald-600 hover:text-emerald-700 font-medium">
            전체보기 →
          </button>
        </div>

        <ProductGrid />
      </section>
    </div>
  );
};

export default HomePage;
