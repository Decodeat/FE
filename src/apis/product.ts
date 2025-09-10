import { API } from './axios';
import type { 
  ProductSearchParams, 
  ProductSearchResponse, 
  AutocompleteParams, 
  AutocompleteResponse 
} from '../types/product';

export const productAPI = {
  // 상품 검색 및 필터링
  searchProducts: async (params: ProductSearchParams): Promise<ProductSearchResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params.productName) {
      searchParams.append('productName', params.productName);
    }
    
    if (params.categories && params.categories.length > 0) {
      params.categories.forEach(category => {
        searchParams.append('categories', category);
      });
    }
    
    if (params.page !== undefined) {
      searchParams.append('page', params.page.toString());
    }
    
    if (params.size !== undefined) {
      searchParams.append('size', params.size.toString());
    }
    
    const response = await API.get<ProductSearchResponse>(
      `/products/search?${searchParams.toString()}`
    );
    return response.data;
  },

  // 상품 검색 자동완성
  getAutocomplete: async (params: AutocompleteParams): Promise<AutocompleteResponse> => {
    const searchParams = new URLSearchParams({
      productName: params.productName
    });
    
    const response = await API.get<AutocompleteResponse>(
      `/products/search/autocomplete?${searchParams.toString()}`
    );
    return response.data;
  },
};
