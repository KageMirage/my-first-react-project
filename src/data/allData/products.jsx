import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://html008.pythonanywhere.com/api/v1/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products/',
      transformResponse: (res) => res?.results || res || [],
    }),
    
    getCategories: builder.query({
      query: () => 'categories/',
      transformResponse: (res) => res?.results || res || [],
    }),

    getFilteredProducts: builder.query({
      query: (filters = {}) => {
        const searchParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== '') {
            searchParams.append(key, val);
          }
        });
        const queryString = searchParams.toString();
        return queryString ? `products/?${queryString}` : 'products/';
      },
      transformResponse: (res) => res?.results || res || [],
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}/`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetFilteredProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
} = productsApi;