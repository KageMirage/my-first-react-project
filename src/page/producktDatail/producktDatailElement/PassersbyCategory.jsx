import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

// 1. Импортируем хуки Redux и экшены корзины и избранного
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../data/allData/redux/addData/cartSlice';
import { toggleFavorite } from '../../../data/allData/redux/favoriteSlice'; // Проверьте путь к слайсу избранного

import { useProducts } from '../../../data/allData/products.jsx';

import img1 from '../../../assets/img/img1.png';
import img2 from '../../../assets/img/img2.png';
import img3 from '../../../assets/img/img3.png';
import img4 from '../../../assets/img/img4.png';

function PassersbyCategory({ productCategory = 8 }) {
  const { id: currentProductId } = useParams();
  const dispatch = useDispatch();

  // 2. Получаем список избранного из Redux store
  const favoriteItems = useSelector((state) => state.favorites?.items || []);

  const { fetchFilteredProducts } = useProducts();

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [addedIds, setAddedIds] = useState({}); // Для индикации добавления
  const scrollContainerRef = useRef(null);

  const fallbackImages = [img1, img2, img3, img4];

  const categoryId = typeof productCategory === 'object' ? productCategory?.id : productCategory;

  useEffect(() => {
    let isMounted = true;

    async function loadSimilarProducts() {
      setLoading(true);
      setError(null);

      const { data, error: apiError } = await fetchFilteredProducts({ category: categoryId || 8 });

      if (isMounted) {
        if (apiError) {
          const errorMessage = typeof apiError === 'object' ? JSON.stringify(apiError) : apiError;
          setError(errorMessage);
        } else {
          const items = data?.results || (Array.isArray(data) ? data : []);
          const filtered = items.filter(item => String(item.id) !== String(currentProductId)).slice(0, 4);
          setDisplayedProducts(filtered);
        }
        setLoading(false);
      }
    }

    loadSimilarProducts();

    return () => {
      isMounted = false;
    };
  }, [fetchFilteredProducts, categoryId, currentProductId]);

  // Обработчик добавления в корзину
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  // Обработчик переключения состояния избранного
  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
  };

  // Проверка наличия товара в избранном
  const checkIsFavorite = (productId) => {
    return favoriteItems.some((item) => String(item.id) === String(productId));
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.children[0]?.offsetWidth || container.clientWidth;

    const newIndex = Math.round(scrollPosition / cardWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < displayedProducts.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToProduct = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.children[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  if (loading) {
    return <div className="text-center py-12 bg-[#FDF4E3] font-sans text-gray-500">Загрузка похожих товаров...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-[#FDF4E3] font-sans text-red-600 px-4">
        Ошибка загрузки: {error}
      </div>
    );
  }

  return (
    <section className="bg-[#FDF4E3] px-4 md:px-10 py-10 md:py-16 text-[#1a1a1a] font-sans">
      
      <h2 className="font-serif text-3xl md:text-4xl mb-6 md:mb-10 pl-2">
        Похожие товары
      </h2>

      {displayedProducts.length === 0 ? (
        <p className="text-center py-10 text-gray-500">Похожие товары не найдены</p>
      ) : (
        <div className="flex flex-col items-center">
          
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:pb-0"
          >
            {displayedProducts.map((product, index) => {
              const imageSrc = product.image || fallbackImages[index % fallbackImages.length];
              const price = product.price ? Math.floor(Number(product.price)) : 3990;
              const brand = product.title || product.brand || 'Stone Island';

              const isFav = checkIsFavorite(product.id);
              const isAdded = addedIds[product.id];

              return (
                <div
                  key={product.id || index}
                  className="group flex flex-col min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-start"
                >
                  
                  <div className="relative w-full aspect-3/4 overflow-hidden mb-3.5 bg-gray-100 rounded-sm">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                      <img
                        src={imageSrc}
                        alt={brand}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = fallbackImages[index % fallbackImages.length];
                        }}
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleToggleFavorite(product)}
                      className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 z-10 cursor-pointer"
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

                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-semibold text-base md:text-lg tracking-wider">
                      {price} ₽
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`p-1.5 rounded-full transition-all duration-300 relative cursor-pointer ${
                        isAdded ? 'bg-green-100 scale-125' : 'hover:opacity-60 active:scale-90'
                      }`}
                      aria-label="В корзину"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {isAdded && (
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                      )}
                    </button>
                  </div>

                  <span className="text-xs md:text-sm text-gray-500 font-light">
                    {brand}
                  </span>

                </div>
              );
            })}
          </div>

          <div className="flex gap-2 mt-5 md:hidden">
            {displayedProducts.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => scrollToProduct(dotIndex)}
                aria-label={`Слайд ${dotIndex + 1}`}
                className={`w-2.5 h-2.5 rounded-full border border-[#6A0008] transition-colors duration-300 ${
                  dotIndex === activeIndex ? 'bg-[#6A0008]' : 'bg-transparent'
                }`}
              />
            ))}
          </div>

        </div>
      )}
    </section>
  );
}

export default PassersbyCategory;