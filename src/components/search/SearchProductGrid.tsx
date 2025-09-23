import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useProductSearch } from "../../hooks/useProduct";
import { useFilterStore } from "../../store/useStore";
import type { ProductSearchParams } from "../../types/product";
import ProductGridSkeleton from "./ProductGridSkeleton";
import Pagination from "../ui/Pagination";

const SearchProductGrid = () => {
  const navigate = useNavigate();

  // 필터 스토어에서 카테고리와 검색어 가져오기
  const { getSelectedProductCategories, searchQuery } = useFilterStore();

  // 검색 상태
  const [searchParams, setSearchParams] = useState<ProductSearchParams>({
    page: 1,
    size: 20,
  });

  // 컴포넌트 마운트 시 홈페이지의 검색어 적용
  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchParams((prev) => ({
        ...prev,
        productName: searchQuery,
        page: 1,
      }));
    }
  }, [searchQuery]);

  // LeftGNB에서 선택된 카테고리를 자동으로 검색에 반영
  useEffect(() => {
    const selectedCategories = getSelectedProductCategories();
    setSearchParams((prev) => ({
      ...prev,
      categories: selectedCategories,
      page: 1, // 카테고리 변경 시 첫 페이지로
    }));
  }, [getSelectedProductCategories]);

  // API 호출
  const { data: searchResult, isLoading, error } = useProductSearch(searchParams);

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
  };

  // 상품 클릭
  const handleProductClick = (productId: number) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <div className="w-full space-y-6">
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
            {searchResult.content.map((product) => {
              const displayImage = product.productImage || "/decodeatLogo.ico";

              return (
                <div
                  key={product.productId}
                  onClick={() => handleProductClick(product.productId)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={displayImage}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/decodeatLogo.ico"; // 기본 이미지로 대체
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
              );
            })}
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
