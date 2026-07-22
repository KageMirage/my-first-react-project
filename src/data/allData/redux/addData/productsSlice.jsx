import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialProducts, fetchCategories, fetchCatalog } from './productsSelectors';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    // Главные товары
    products: [],
    loading: false,
    error: null,

    // Категории
    categories: [],
    categoriesLoading: false,

    // Каталог и фильтры
    catalogProducts: [],
    catalogLoading: false,
    catalogError: null,
    filters: {},
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Initial Products
      .addCase(fetchInitialProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchInitialProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })

      // Catalog Filtered
      .addCase(fetchCatalog.pending, (state) => {
        state.catalogLoading = true;
        state.catalogError = null;
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.catalogLoading = false;
        state.catalogProducts = action.payload;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.catalogLoading = false;
        state.catalogError = action.payload;
      });
  },
});

export const { setFilters, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;