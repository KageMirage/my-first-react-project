import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../data/allData/redux/addData/cartSlice';

import {
  toggleFavorite,
  selectFavoriteItems,
} from '../../data/allData/redux/addData/favoritesSlice';

import img1 from '../../assets/img/img1.png';
import img2 from '../../assets/img/img2.png';
import img3 from '../../assets/img/img3.png';
import img4 from '../../assets/img/img4.png';
import cartIcon from '../../assets/svg/cartIcon.svg';

const fallbackImages = [img1, img2, img3, img4];

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavoriteItems);
  const [addedIds, setAddedIds] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
  };

  return (
    <section className="bg-[#FDF4E3] min-h-screen px-4 md:px-10 py-8 text-[#1a1a1a] font-sans">
      <div className="flex items-center gap-2 text-sm mb-6 text-gray-700">
        <Link to="/" className="hover:underline flex items-center gap-1">
          ‹ На главную
        </Link>
        <span>•</span>
        <span className="font-semibold underline">Избранное</span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-serif mb-4">В избранном пока ничего нет</h2>
          <p className="text-gray-600 mb-6">Добавляйте понравившиеся товары, нажав на сердечко</p>
          <Link to="/" className="inline-block bg-[#1a1a1a] text-white px-6 py-3 rounded-sm hover:bg-gray-800 transition">
            Перейти к покупкам
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product, index) => {
            const defaultFallback = fallbackImages[index % fallbackImages.length];
            const imageSrc = product.image || defaultFallback;
            const isAdded = addedIds[product.id];

            return (
              <div key={product.id || index} className="group flex flex-col">
                <div className="relative w-full aspect-3/4 overflow-hidden mb-3 bg-gray-100 rounded-sm">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={imageSrc}
                      alt={product.title || 'Товар'}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultFallback; // ИСПРАВЛЕНО ЗДЕСЬ
                      }}
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleToggleFavorite(product)}
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 z-10 cursor-pointer"
                    aria-label="Удалить из избранного"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-200" viewBox="0 0 24 24" fill="#6A0008" stroke="#6A0008" strokeWidth="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-base md:text-lg tracking-wider">
                    {product.price ? Math.floor(Number(product.price)) : 0} ₽
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className={`p-1.5 rounded-full transition-all duration-300 relative cursor-pointer ${
                      isAdded ? 'bg-green-100 scale-125' : 'hover:opacity-60 active:scale-90'
                    }`}
                    aria-label="В корзину"
                  >
                    <img src={cartIcon} alt="Корзина" className="w-5 h-5" />
                    {isAdded && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    )}
                  </button>
                </div>

                <span className="text-xs md:text-sm text-gray-500 font-light">
                  {product.title || product.country || "Stone Island"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Favorites;