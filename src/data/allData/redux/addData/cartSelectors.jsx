export const selectCartItems = (state) => state.cart.cartItems;
export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCheckoutError = (state) => state.cart.checkoutError;

export const selectTotalPrice = (state) =>
  state.cart.cartItems.reduce((acc, item) => {
    const p = Math.floor(Number(item.price)) || 0;
    return acc + p * item.quantity;
  }, 0);

export const selectTotalCount = (state) =>
  state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);