import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useProductSearch, useProductAutocomplete } from "../../hooks/useProduct";
import { useFilterStore } from "../../store/useStore";
import type { ProductSearchParams } from "../../types/product";
import ProductGridSkeleton from "./ProductGridSkeleton";
import Pagination from "../ui/Pagination";

const SearchProductGrid = () => {
  const navigate = useNavigate();
  
  // 필터 스토어에서 카테고리 가져오기
  const { getSelectedProductCategories } = useFilterStore();
  
  // 검색 상태
  const [searchParams, setSearchParams] = useState<ProductSearchParams>({
    page: 1,
    size: 20,
  });
  const [searchInput, setSearchInput] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // LeftGNB에서 선택된 카테고리를 자동으로 검색에 반영
  useEffect(() => {
    const selectedCategories = getSelectedProductCategories();
    setSearchParams(prev => ({
      ...prev,
      categories: selectedCategories,
      page: 1, // 카테고리 변경 시 첫 페이지로
    }));
  }, [getSelectedProductCategories]);

  // API 훅
  const { data: searchResult, isLoading, error } = useProductSearch(searchParams);
  const { data: autocompleteData } = useProductAutocomplete(
    { productName: searchInput },
    showAutocomplete && searchInput.length > 0
  );

  // 검색 실행
  const handleSearch = (productName?: string) => {
    setSearchParams(prev => ({
      ...prev,
      productName: productName || searchInput,
      page: 1,
    }));
    setShowAutocomplete(false);
  };

  // 카테고리 필터 변경 (LeftGNB에서 처리하므로 제거)
  // const handleCategoryChange = ...

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
  };

  // 자동완성 선택
  const handleAutocompleteSelect = (productName: string) => {
    setSearchInput(productName);
    handleSearch(productName);
  };

  // 상품 클릭
  const handleProductClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <div className="w-full space-y-6">
      {/* 검색 영역 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* 검색바 */}
        <div className="relative mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowAutocomplete(true);
              }}
              onFocus={() => setShowAutocomplete(true)}
              onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
              placeholder="상품명을 입력하세요"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={() => handleSearch()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* 자동완성 드롭다운 */}
          {showAutocomplete && autocompleteData && autocompleteData.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {autocompleteData.map((item) => (
                <button
                  key={item.productId}
                  onClick={() => handleAutocompleteSelect(item.productName)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                >
                  {item.productName}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 카테고리 필터는 LeftGNB에서 처리 */}
        <div className="text-sm text-gray-500">
          카테고리 필터는 좌측 사이드바에서 설정할 수 있습니다.
        </div>
      </div>

      {/* 검색 결과 */}
      {isLoading ? (
        <ProductGridSkeleton />
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <ShoppingCart className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 중 오류가 발생했습니다</h3>
          <p className="text-gray-500">잠시 후 다시 시도해주세요.</p>
        </div>
      ) : searchResult && searchResult.content.length > 0 ? (
        <>
          {/* 검색 결과 개수 */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              총 {searchResult.totalElements}개의 상품을 찾았습니다
            </p>
          </div>

          {/* 상품 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResult.content.map((product) => (
              <div
                key={product.productId}
                onClick={() => handleProductClick(product.productId)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{product.manufacturer}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.productName}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          {searchResult.totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={searchParams.page || 1}
                totalPages={searchResult.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500">다른 검색어나 필터를 시도해보세요.</p>
        </div>
      )}
    </div>
  );
};

export default SearchProductGrid;
