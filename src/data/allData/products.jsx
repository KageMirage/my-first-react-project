import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useApiData } from '../getData';
import axios from 'axios';

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const { data: products, loading, error } = useApiData('https://html008.pythonanywhere.com/api/v1/products/');
  const { data: categoriesData, loading: categoriesLoading } = useApiData('https://html008.pythonanywhere.com/api/v1/categories/');
  const categories = categoriesData?.results || categoriesData || [];

  const [catalogProducts, setCatalogProducts] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState(null);

  const [filters, setFilters] = useState({});

  const fetchFilteredProducts = useCallback(async (filterParams = {}) => {
    const baseUrl = 'https://html008.pythonanywhere.com/api/v1/products/';
    const searchParams = new URLSearchParams();

    Object.entries(filterParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();
    const finalUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    try {
      const res = await axios.get(finalUrl);
      return { data: res.data, error: null };
    } catch (err) {
      return { data: null, error: err.message || 'Ошибка фильтрации' };
    }
  }, []);

  const applyCatalogFilters = async (newFilters) => {
    setFilters(newFilters);
    setCatalogLoading(true);
    setCatalogError(null);

    const { data, error: apiError } = await fetchFilteredProducts(newFilters);

    if (apiError) {
      setCatalogError(apiError);
    } else {
      setCatalogProducts(data?.results || data || []);
    }
    setCatalogLoading(false);
  };

  const resetCatalogFilters = () => {
    applyCatalogFilters({});
  };

  const fetchProductById = async (id) => {
    try {
      const res = await axios.get(`https://html008.pythonanywhere.com/api/v1/products/${id}/`);
      return { data: res.data, error: null };
    } catch (err) {
      return { data: null, error: err.message || 'Ошибка загрузки товара' };
    }
  };

  return (
    <ProductsContext.Provider value={{ 
      products, 
      loading, 
      error, 
      categories,
      categoriesLoading,
      catalogProducts,
      catalogLoading,
      catalogError,
      filters,
      applyCatalogFilters,
      resetCatalogFilters,
      fetchFilteredProducts, 
      fetchProductById     
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);