import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../../../data/allData/products';
import { useFavorites } from '../../../data/allData/FavoriteCintext';
import { useCart } from '../../../data/allData/CartContext';
import { ProductSkeleton } from '../../sceleton/ProductSkeleton';

import img1 from '../../../assets/img/img1.png';
import img2 from '../../../assets/img/img2.png';
import img3 from '../../../assets/img/img3.png';
import img4 from '../../../assets/img/img4.png';
import cartIcon from '../../../assets/svg/cartIcon.svg';

const placeholderImages = [img1, img2, img3, img4];

function FilterCatalogSkeleton({ count = 9 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
}

function FilterProduct() {
  const { catalogProducts, catalogLoading, catalogError } = useProducts();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [addedIds, setAddedIds] = useState({});
  const itemsPerPage = 9;

  const rawProducts = Array.isArray(catalogProducts)
    ? catalogProducts
    : Array.isArray(catalogProducts?.results)
      ? catalogProducts.results
      : [];

  const minPriceParam = searchParams.get('min_price');
  const maxPriceParam = searchParams.get('max_price');

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const filteredProducts = rawProducts.filter((product) => {
    const price = Number(product.price) || 0;

    if (minPriceParam !== null && minPriceParam !== undefined) {
      const trimmedMin = String(minPriceParam).trim();
      if (trimmedMin !== '') {
        const minNum = Number(trimmedMin);
        if (!isNaN(minNum) && minNum > 0 && price < minNum) {
          return false;
        }
      }
    }

    if (maxPriceParam !== null && maxPriceParam !== undefined) {
      const trimmedMax = String(maxPriceParam).trim();
      if (trimmedMax !== '') {
        const maxNum = Number(trimmedMax);
        if (!isNaN(maxNum) && maxNum > 0 && price > maxNum) {
          return false;
        }
      }
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ЕСЛИ ИДЕТ ЗАГРУЗКА КАТАЛОГА — ПОКАЗЫВАЕМ СЕТКУ СКЕЛЕТОНОВ
  if (catalogLoading) {
    return <FilterCatalogSkeleton count={itemsPerPage} />;
  }

  if (catalogError) {
    return (
      <div className="w-full text-center py-20 text-red-500 font-sans">
        Ошибка загрузки: {typeof catalogError === 'object' ? JSON.stringify(catalogError) : catalogError}
      </div>
    );
  }

  const isInitialState = rawProducts.length === 0;

  return (
    <div className="w-full font-sans">
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
          {currentItems.map((product, index) => {
            const fallbackImage = placeholderImages[index % placeholderImages.length];
            const productImage = product.image || fallbackImage;
            const isFav = isFavorite(product.id);
            const isAdded = addedIds[product.id];

            return (
              <div key={product.id || index} className="group flex flex-col">
                <div className="relative aspect-3/4 bg-gray-100 overflow-hidden mb-3 rounded-sm">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={productImage}
                      alt={product.title || 'Товар'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
                    />
                  </Link>
                  
                  <button 
                    type="button" 
                    onClick={() => toggleFavorite(product)}
                    className="absolute top-3 right-3 w-9 h-9 md:w-10 md:h-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 z-10" 
                    aria-label={isFav ? "Удалить из избранного" : "Добавить в избранное"}
                  >
                    <svg 
                      className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-200" 
                      viewBox="0 0 24 24" 
                      fill={isFav ? "#6A0008" : "none"} 
                      stroke={isFav ? "#6A0008" : "#1a1a1a"} 
                      strokeWidth="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-base text-[#1a1a1a]">
                    {product.price ? `${parseInt(product.price)} ₽` : '3990 ₽'}
                  </span>
                  
                  <button 
                    type="button" 
                    onClick={() => handleAddToCart(product)}
                    className={`p-1.5 rounded-full transition-all duration-300 relative ${
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

                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {product.title || 'Stone Island'}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 font-sans">
          {isInitialState
            ? "Товары отсутствуют."
            : "Товары не найдены в данном ценовом диапазоне."}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-3 mt-12 text-xs text-[#1a1a1a] tracking-wider">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const formattedNum = pageNum < 10 ? `0${pageNum}` : pageNum;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`pb-0.5 transition-all cursor-pointer ${
                  isActive 
                    ? 'border-b border-[#1a1a1a] font-bold' 
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                {formattedNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="hover:opacity-60 disabled:opacity-30 cursor-pointer ml-1"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterProduct;