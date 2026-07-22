import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../favoritesSlice';
import {
  selectFavoriteItems,
  selectFavoritesCount,
  selectIsFavorite,
} from '../favoritesSelectors';

export function useFavorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteItems);
  const favoritesCount = useSelector(selectFavoritesCount);

  return {
    favorites,
    favoritesCount,
    toggleFavorite: (product) => dispatch(toggleFavorite(product)),
    isFavorite: (productId) => favorites.some((item) => item.id === productId),
  };
}