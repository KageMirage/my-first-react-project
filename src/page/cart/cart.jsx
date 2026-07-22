import React, { useState, useEffect } from 'react';

// 1. Импортируем Redux хуки и созданные слайсы
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  checkoutCart, // Раскомментируйте, если отправляете асинхронный checkout на сервер
} from '../../data/allData/redux/addData/cartSlice';

import img1 from '../../assets/img/img1.png';
import img2 from '../../assets/img/img2.png';
import img3 from '../../assets/img/img3.png';
import img4 from '../../assets/img/img4.png';

const fallbackImages = [img1, img2, img3, img4];

function CartDrawer() {
  const dispatch = useDispatch();

  // 2. Получаем данные из Redux стора
  const { cartItems, isCartOpen, loading } = useSelector((state) => state.cart);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Блокировка скролла страницы при открытой корзине
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Сброс экрана успеха при закрытии корзины
  useEffect(() => {
    if (!isCartOpen) {
      setIsSubmitted(false);
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleClose = () => {
    dispatch(toggleCart(false));
  };

  const handleCheckout = async () => {
    // Если в cartSlice вы используете асинхронный checkoutCart:
    // const result = await dispatch(checkoutCart());
    // if (checkoutCart.fulfilled.match(result)) { setIsSubmitted(true); }

    // Локальное оформление заказа:
    setIsSubmitted(true);
    dispatch(clearCart());
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Затемняющий оверлей */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-md bg-[#FDF4E3] h-full shadow-2xl flex flex-col justify-between p-6 md:p-8 font-sans overflow-y-auto">
        <div>
          {/* Шапка корзины */}
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#222222]/10">
            <h2 className="font-serif text-2xl md:text-3xl tracking-widest uppercase text-[#111111]">
              Корзина
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="text-[#111111] hover:opacity-60 text-xl p-1 cursor-pointer"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>

          {/* Контент: Сообщение об успехе / Пустая корзина / Список товаров */}
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-[#5b0000]/10 text-[#5b0000] rounded-full flex items-center justify-center text-3xl font-bold">
                ✓
              </div>
              <h3 className="font-serif text-xl tracking-wide uppercase text-[#111111]">
                Заказ успешно оформлен!
              </h3>
              <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
                Спасибо за покупку. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 bg-[#5b0000] text-white text-xs uppercase tracking-wider hover:bg-[#400000] transition-colors cursor-pointer"
              >
                Продолжить покупки
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-sm">
              Ваша корзина пуста
            </div>
          ) : (
            <div className="flex flex-col">
              {cartItems.map((item, index) => {
                const itemPrice = item.price ? parseInt(item.price) : 0;
                const defaultFallback = fallbackImages[index % fallbackImages.length];
                const imageSrc = item.image || defaultFallback;

                return (
                  <div key={item.id || index} className="py-4 border-b border-[#222222]/20 flex gap-4 items-center">
                    <div className="w-20 h-24 bg-gray-200 shrink-0 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={item.title || 'Товар'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultFallback;
                        }}
                      />
                    </div>

                    <div className="grow flex flex-col justify-between h-24 py-0.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#111111] line-clamp-2">
                          {item.title || 'КОЖАНАЯ КУРТКА'}
                        </span>
                        <span className="text-xs md:text-sm font-semibold whitespace-nowrap text-[#111111]">
                          {itemPrice.toFixed(2)} ₽
                        </span>
                      </div>

                      <div className="flex justify-between items-end">
                        {/* Изменение количества товара */}
                        <div className="flex items-center border border-[#222222]/40 px-2 py-0.5 gap-3 text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.id,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                            className="hover:opacity-60 text-sm cursor-pointer"
                          >
                            −
                          </button>
                          <span className="font-medium text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            className="hover:opacity-60 text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Удаление товара из корзины */}
                        <button
                          type="button"
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-[10px] uppercase underline tracking-wider text-[#444444] hover:text-[#5b0000] transition-colors cursor-pointer"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Кнопка оформления заказа */}
        {!isSubmitted && cartItems.length > 0 && (
          <div className="pt-6 mt-auto border-t border-[#222222]/10">
            <button
              type="button"
              disabled={loading}
              onClick={handleCheckout}
              className="w-full bg-[#5b0000] hover:bg-[#400000] text-white py-3.5 text-center text-xs md:text-sm font-medium tracking-wide block transition-colors uppercase cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Оформление...' : 'Оформить заказ'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;