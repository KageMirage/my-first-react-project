import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('favorites_products');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Ошибка чтения favorites:', e);
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavoritesFromStorage(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      if (!product || product.id === undefined) return;

      // Приводим ID к числу (как в корзине), чтобы исключить проблемы типов
      const targetId = Number(product.id);
      const index = state.items.findIndex((item) => Number(item.id) === targetId);

      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }

      localStorage.setItem('favorites_products', JSON.stringify(state.items));
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem('favorites_products');
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;


export const selectFavoriteItems = (state) => state.favorites.items;

export const selectFavoritesCount = (state) =>
  state.favorites.items ? state.favorites.items.length : 0;

export const selectIsFavorite = (productId) => (state) =>
  state.favorites.items.some((item) => Number(item.id) === Number(productId));