import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart, checkoutCart, } from '../addData/cartSlice';
import { selectCartItems, selectTotalPrice, selectTotalCount, selectCartLoading, selectCheckoutError, } from '../addData/cartSelectors';

export function useCart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalCount = useSelector(selectTotalCount);
  const loading = useSelector(selectCartLoading);
  const checkoutError = useSelector(selectCheckoutError);

  return {
    cartItems,
    totalPrice,
    totalCount,
    loading,
    checkoutError,
    addToCart: (product, quantity) => dispatch(addToCart({ product, quantity })),
    updateQuantity: (productId, quantity) => dispatch(updateQuantity({ productId, quantity })),
    removeFromCart: (productId) => dispatch(removeFromCart(productId)),
    checkout: () => dispatch(checkoutCart()),
  };
}