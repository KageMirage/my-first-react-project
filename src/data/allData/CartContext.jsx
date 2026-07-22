import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('shopping_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (e) {
            console.error('Ошибка чтения корзины из localStorage:', e);
            return [];
        }
    });

    const [loading, setLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
        } catch (e) {
            console.error('Ошибка сохранения корзины в localStorage:', e);
        }
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingIndex > -1) {
                const updated = [...prevItems];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const checkout = async () => {
        if (cartItems.length === 0) return { success: false, message: 'Корзина пуста' };

        setLoading(true);
        setCheckoutError(null);

        try {
            const requests = cartItems.map(item =>
                fetch('https://html008.pythonanywhere.com/api/v1/cart/', {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        product: Number(item.id),
                        quantity: Number(item.quantity) || 1,
                    }),
                })
            );

            const responses = await Promise.all(requests);

            for (const res of responses) {
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    const errorMsg =
                        errData.product?.[0] ||
                        errData.quantity?.[0] ||
                        `Ошибка сервера: ${res.status}`;
                    throw new Error(errorMsg);
                }
            }

            cartItems.length = 0;

            setCartItems([]);
            localStorage.removeItem('shopping_cart');

            setLoading(false);
            return { success: true };
        } catch (err) {
            setLoading(false);
            setCheckoutError(err.message || 'Произошла ошибка при оформлении заказа');
            return { success: false, error: err.message };
        }
    };

    // Подсчет общей стоимости и количества
    const totalPrice = cartItems.reduce((acc, item) => {
        const p = Math.floor(Number(item.price)) || 0;
        return acc + p * item.quantity;
    }, 0);

    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            isCartOpen,
            openCart,
            closeCart,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}