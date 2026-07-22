import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Экшены из слайсов
import { addToCart, updateQuantity, removeFromCart } from '../../../data/allData/redux/addData/cartSlice';
import { toggleFavorite } from '../../../data/allData/redux/favoriteSlice';

// RTK Query хэндлер
import { useGetProductByIdQuery } from '../../../data/allData/products';

import defaultImg from '../../../assets/img/img2.png';

function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 1. Загрузка товара через RTK Query
  const { data: product, isLoading: loading, error } = useGetProductByIdQuery(id);

  // 2. Достаем данные из Redux Store
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const favoriteItems = useSelector((state) => state.favorites?.items || []);

  if (loading) {
    return (
      <div className="w-full text-center py-20 text-gray-500 font-sans bg-[#f9f3e5] min-h-screen">
        Загрузка информации о товаре...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full text-center py-20 font-sans bg-[#f9f3e5] min-h-screen">
        <p className="text-gray-500 text-lg mb-4">Товар не найден</p>
        <Link to="/catalog" className="text-[#5b0000] underline font-medium">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const productImage = product.image || defaultImg;
  const productPrice = product.price ? parseInt(product.price) : 1199;
  const productTitle = product.title || 'Кожаная куртка';
  const careInfo = product.care || 'деликатная машинная стирка';
  const composition = product.compound || product.composition || '80% кожа 20% полиэстер';
  const country = product.country || 'США';
  const description = product.description || 'Стильная и универсальная модель.';

  // Проверка на Избранное
  const isFav = favoriteItems.some((item) => String(item.id) === String(product.id));

  // Поиск товара в корзине
  const cartItem = cartItems.find((item) => String(item.id) === String(product.id));
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  // Обработчик управления количеством
  const handleIncrease = () => {
    if (cartItem) {
      // КЛЮЧЕВОЙ МОМЕНТ: Передаем productId
      dispatch(updateQuantity({ productId: product.id, quantity: currentQuantity + 1 }));
    } else {
      // КЛЮЧЕВОЙ МОМЕНТ: Передаем { product, quantity }
      dispatch(addToCart({ product, quantity: 1 }));
    }
  };

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ productId: product.id, quantity: currentQuantity - 1 }));
    } else {
      dispatch(removeFromCart(product.id));
    }
  };

  return (
    <div className="w-full bg-[#f9f3e5] min-h-screen flex justify-center items-center py-10 px-4 md:px-8 font-sans">
      <div className="max-w-250 w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        <div className="relative w-full aspect-4/3 md:aspect-5/6 overflow-hidden">
          <img
            src={productImage}
            alt={productTitle}
            className="w-full h-full object-cover block"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
          />
          <button
            type="button"
            onClick={() => dispatch(toggleFavorite(product))}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 transition-transform"
            aria-label={isFav ? "Удалить из избранного" : "Добавить в избранное"}
          >
            <svg width="16" height="15" viewBox="0 0 24 24" fill={isFav ? "#5b0000" : "none"} stroke={isFav ? "#5b0000" : "#222"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col text-[#222222]">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-[#111111]">
            {productTitle}
          </h1>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-xs text-[#777777]">цена</span>
            <span className="text-xl md:text-2xl font-bold text-[#111111]">
              {productPrice} ₽
            </span>
          </div>

          <div className="flex flex-col gap-2.5 text-xs tracking-wider mb-6">
            <div className="grid grid-cols-[130px_1fr] items-baseline">
              <span className="font-bold text-[#111111] uppercase">УХОД И СТИРКА</span>
              <span className="text-[#444444] lowercase">{careInfo}</span>
            </div>
            <div className="grid grid-cols-[130px_1fr] items-baseline">
              <span className="font-bold text-[#111111] uppercase">СОСТАВ</span>
              <span className="text-[#444444]">{composition}</span>
            </div>
            <div className="grid grid-cols-[130px_1fr] items-baseline">
              <span className="font-bold text-[#111111] uppercase">СТРАНА БРЕНДА</span>
              <span className="text-[#444444]">{country}</span>
            </div>
          </div>

          <div className="w-full h-px bg-[#222222]/20 mb-6"></div>

          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
              ОПИСАНИЕ ТОВАРА
            </h3>
            <p className="text-xs md:text-[13px] leading-relaxed text-[#444444] font-normal">
              {description}
            </p>
          </div>

          <div className="w-full h-px bg-[#222222]/20 mb-6"></div>

          {currentQuantity > 0 ? (
            <div className="w-48 h-11 bg-[#5b0000] text-white flex items-center justify-between px-3 select-none">
              <button
                type="button"
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-black/20 rounded transition-colors cursor-pointer"
              >
                −
              </button>
              
              <div className="flex flex-col items-center leading-none">
                <span className="text-xs font-semibold">{currentQuantity} шт.</span>
                <span className="text-[10px] text-gray-200 opacity-80">в корзине</span>
              </div>

              <button
                type="button"
                onClick={handleIncrease}
                className="w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-black/20 rounded transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
              className="w-48 h-11 bg-[#5b0000] hover:bg-[#400000] text-white text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer text-center"
            >
              В корзину
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default DetailProduct;