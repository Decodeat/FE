import { Search } from 'lucide-react';

const SearchPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* 상단 배너 */}
      <section className="w-full bg-[#D2EDE4] py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D5945] mb-2">
          어떤 제품이든, 궁금한 영양정보를 찾아보세요!
        </h2>
        <p className="text-gray-700 mb-6">영양 성분을 쉽고 빠르게 확인할 수 있어요.</p>

        {/* 검색창 */}
        <div className="max-w-md mx-auto w-full relative">
          <input
            type="text"
            placeholder="제품명을 입력해보세요"
            className="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </section>

      {/* 직접 등록 안내 */}
      <section className="text-center py-10 px-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          찾으시는 제품이 없다면, 직접 등록해보세요!
        </h3>
        <p className="text-gray-600 mb-6">사진을 등록하면 빠르게 분석해드릴게요!</p>

        <button className="bg-[#2D5945] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#244838] transition">
          + 제품 직접 등록하기
        </button>
      </section>
    </div>
  );
};

export default SearchPage;
