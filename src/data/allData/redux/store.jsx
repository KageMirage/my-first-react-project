import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './addData/cartSlice';
import favoritesReducer from './addData/favoritesSlice';
import productsReducer from './addData/productsSlice';

import { productsApi } from '../products';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    products: productsReducer,
    
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});