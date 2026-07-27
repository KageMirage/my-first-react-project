import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialProducts, fetchCategories, fetchCatalog } from './productsSelectors';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,

    categories: [],
    categoriesLoading: false,

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

      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })

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