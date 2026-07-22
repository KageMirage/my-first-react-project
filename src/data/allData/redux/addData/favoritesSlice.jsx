import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('favorites_products');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Ошибка чтения favorites из localStorage:', e);
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
      const index = state.items.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }

      try {
        localStorage.setItem('favorites_products', JSON.stringify(state.items));
      } catch (e) {
        console.error('Ошибка записи favorites в localStorage:', e);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem('favorites_products');
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;