import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('shopping_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Ошибка чтения корзины:', e);
    return [];
  }
};

export const checkoutCart = createAsyncThunk(
  'cart/checkout',
  async (_, { getState, rejectWithValue }) => {
    const { cartItems } = getState().cart;
    if (cartItems.length === 0) return rejectWithValue('Корзина пуста');

    try {
      const requests = cartItems.map(item =>
        fetch('https://html008.pythonanywhere.com/api/v1/cart/', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: Number(item.id),
            quantity: Number(item.quantity) || 1,
          }),
        })
      );

      const responses = await Promise.all(requests);

      for (const res of responses) {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const errorMsg =
            errData.product?.[0] ||
            errData.quantity?.[0] ||
            `Ошибка сервера: ${res.status}`;
          return rejectWithValue(errorMsg);
        }
      }

      return true;
    } catch (err) {
      return rejectWithValue(err.message || 'Произошла ошибка при оформлении');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: loadCartFromStorage(),
    loading: false,
    checkoutError: null,
    isCartOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existing = state.cartItems.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }
      localStorage.setItem('shopping_cart', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.cartItems = state.cartItems.filter(item => item.id !== productId);
      } else {
        const item = state.cartItems.find(i => i.id === productId);
        if (item) item.quantity = quantity;
      }
      localStorage.setItem('shopping_cart', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem('shopping_cart', JSON.stringify(state.cartItems));
    },
    toggleCart: (state, action) => {
      state.isCartOpen = action.payload ?? !state.isCartOpen;
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('shopping_cart');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.loading = true;
        state.checkoutError = null;
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        localStorage.removeItem('shopping_cart');
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.loading = false;
        state.checkoutError = action.payload;
      });
  },
});

export const { addToCart, updateQuantity, removeFromCart, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;