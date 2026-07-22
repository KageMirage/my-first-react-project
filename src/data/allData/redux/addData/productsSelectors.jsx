import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { productsApi } from '../../products';

export const fetchInitialProducts = createAsyncThunk(
  'products/fetchInitial',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://html008.pythonanywhere.com/api/v1/products/');
      return res.data?.results || res.data || [];
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка загрузки товаров');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://html008.pythonanywhere.com/api/v1/categories/');
      return res.data?.results || res.data || [];
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка загрузки категорий');
    }
  }
);

export const fetchCatalog = createAsyncThunk(
  'products/fetchCatalog',
  async (filters, { rejectWithValue }) => {
    try {
      const data = await productsApi.fetchFiltered(filters);
      return data?.results || data || [];
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка фильтрации');
    }
  }
);