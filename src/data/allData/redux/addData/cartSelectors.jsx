export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCheckoutError = (state) => state.cart.checkoutError;

export const selectTotalCount = (state) =>
  state.cart.cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);

export const selectTotalPrice = (state) =>
  state.cart.cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );