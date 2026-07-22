import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites_products');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Ошибка чтения favorites из localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites_products', JSON.stringify(favorites));
    } catch (e) {
      console.error('Ошибка записи favorites в localStorage:', e);
    }
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id);
      if (exists) {
        return prevFavorites.filter((item) => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);