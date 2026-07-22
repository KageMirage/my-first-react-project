import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './addData/cartSlice';
import favoritesReducer from './addData/favoritesSlice';
import productsReducer from './addData/productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    products: productsReducer,
  },
});