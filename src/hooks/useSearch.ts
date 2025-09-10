import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "../store/useStore";
import { useProductAutocomplete } from "./useProduct";

export const useSearchLogic = (redirectToSearchPage = true, onSearchComplete?: () => void) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  // 자동완성 API
  const { data: autocompleteData } = useProductAutocomplete(
    { productName: searchQuery },
    showAutocomplete && searchQuery.length > 0,
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // 검색어가 있으면 검색 페이지로 이동
    if (searchQuery.trim() && redirectToSearchPage) {
      navigate("/search");
    }
    setShowAutocomplete(false);
    onSearchComplete?.();
  };

  // 자동완성 선택
  const handleAutocompleteSelect = (productName: string) => {
    setSearchQuery(productName);
    setShowAutocomplete(false);
    if (redirectToSearchPage) {
      navigate("/search");
    } else {
      onSearchComplete?.();
    }
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    setShowAutocomplete(true);
  };

  const handleInputFocus = () => {
    setShowAutocomplete(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowAutocomplete(false), 200);
  };

  return {
    searchQuery,
    showAutocomplete,
    autocompleteData,
    handleSearch,
    handleAutocompleteSelect,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  };
};
