export const selectFavoriteItems = (state) => state.favorites.items;

export const selectFavoritesCount = (state) => state.favorites.items.length;

export const selectIsFavorite = (productId) => (state) =>
  state.favorites.items.some((item) => item.id === productId);