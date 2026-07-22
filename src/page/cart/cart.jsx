import React, { useState, useEffect } from 'react';
import { useCart } from '../../data/allData/CartContext';

import img1 from '../../assets/img/img1.png';
import img2 from '../../assets/img/img2.png';
import img3 from '../../assets/img/img3.png';
import img4 from '../../assets/img/img4.png';

const fallbackImages = [img1, img2, img3, img4];

function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, closeCart, clearCart } = useCart();

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  useEffect(() => {
    if (!isCartOpen) {
      setIsSubmitted(false);
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsSubmitted(true);
    if (clearCart) {
      clearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="relative z-10 w-full max-w-md bg-[#FDF4E3] h-full shadow-2xl flex flex-col justify-between p-6 md:p-8 font-sans overflow-y-auto">

        <div>
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#222222]/10">
            <h2 className="font-serif text-2xl md:text-3xl tracking-widest uppercase text-[#111111]">
              Корзина
            </h2>
            <button
              type="button"
              onClick={closeCart}
              className="text-[#111111] hover:opacity-60 text-xl p-1 cursor-pointer"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>

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
                onClick={closeCart}
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
                        <div className="flex items-center border border-[#222222]/40 px-2 py-0.5 gap-3 text-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="hover:opacity-60 text-sm cursor-pointer"
                          >
                            −
                          </button>
                          <span className="font-medium text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="hover:opacity-60 text-sm cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
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

        {!isSubmitted && cartItems.length > 0 && (
          <div className="pt-6 mt-auto border-t border-[#222222]/10">
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-[#5b0000] hover:bg-[#400000] text-white py-3.5 text-center text-xs md:text-sm font-medium tracking-wide block transition-colors uppercase cursor-pointer"
            >
              Оформить заказ
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CartDrawer;