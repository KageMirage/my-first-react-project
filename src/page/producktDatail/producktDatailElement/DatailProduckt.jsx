import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../../../data/allData/products';
import { useFavorites } from '../../../data/allData/FavoriteCintext';
import { useCart } from '../../../data/allData/CartContext';

import defaultImg from '../../../assets/img/img2.png';

function DetailProduct() {
  const { id } = useParams();
  const { catalogProducts, catalogLoading, fetchProductById } = useProducts();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadProduct() {
      setLoading(true);
      setError(null);

      const productsList = Array.isArray(catalogProducts)
        ? catalogProducts
        : Array.isArray(catalogProducts?.results)
          ? catalogProducts.results
          : [];

      const foundProduct = productsList.find((item) => String(item.id) === String(id));
      
      if (foundProduct) {
        if (isMounted) {
          setProduct(foundProduct);
          setLoading(false);
        }
      } else if (!catalogLoading) {
        const { data: fetchedProduct, error: fetchError } = await fetchProductById(id);
        
        if (isMounted) {
          if (fetchError) {
            setError(fetchError);
          } else {
            setProduct(fetchedProduct);
          }
          setLoading(false);
        }
      } else if (isMounted) {
        setLoading(catalogLoading);
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id, catalogProducts, catalogLoading, fetchProductById]);

  if (loading) {
    return (
      <div className="w-full text-center py-20 text-gray-500 font-sans bg-[#f9f3e5] min-h-screen">
        Загрузка информации о товаре...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-20 text-red-500 font-sans bg-[#f9f3e5] min-h-screen">
        Ошибка загрузки: {error}
      </div>
    );
  }

  if (!product) {
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
  const productTitle = product.title || 'Кожанная куртка';
  const careInfo = product.care || 'деликатная машинная стирка';
  const composition = product.compound || product.composition || '80% кожа 20% полиэстер';
  const country = product.country || 'США';
  const description = product.description || 'Кожаная куртка женская — стильная и универсальная модель, выполненная из мягкой экокожи.';

  const isFav = isFavorite(product.id);

  const cartItem = cartItems?.find((item) => String(item.id) === String(product.id));
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleIncrease = () => {
    if (cartItem) {
      updateQuantity(product.id, currentQuantity + 1);
    } else {
      addToCart(product, 1);
    }
  };

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      removeFromCart(product.id);
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
            onClick={() => toggleFavorite(product)}
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
                title="Уменьшить"
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
                title="Увеличить"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
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