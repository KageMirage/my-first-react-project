import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../addData/cartSlice';
import { selectIsCartOpen } from '../addData/cartSelectors';

export function useCartUI() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);

  return {
    isCartOpen,
    openCart: () => dispatch(toggleCart(true)),
    closeCart: () => dispatch(toggleCart(false)),
    toggleCart: () => dispatch(toggleCart()),
  };
}