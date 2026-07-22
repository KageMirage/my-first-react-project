import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialProducts, fetchCategories, fetchCatalog } from '../addData/productsSelectors';
import { setFilters, resetFilters } from '../addData/productsSlice';

export function useProducts() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.products);

  useEffect(() => {
    if (state.products.length === 0) {
      dispatch(fetchInitialProducts());
    }
    if (state.categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, state.products.length, state.categories.length]);

  return {
    products: state.products,
    loading: state.loading,
    error: state.error,
    categories: state.categories,
    categoriesLoading: state.categoriesLoading,
    catalogProducts: state.catalogProducts,
    catalogLoading: state.catalogLoading,
    catalogError: state.catalogError,
    filters: state.filters,

    applyCatalogFilters: (newFilters) => {
      dispatch(setFilters(newFilters));
      dispatch(fetchCatalog(newFilters));
    },
    resetCatalogFilters: () => {
      dispatch(resetFilters());
      dispatch(fetchCatalog({}));
    },
  };
}