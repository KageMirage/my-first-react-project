import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../data/allData/CartContext';

import logo from '../../assets/svg/logo.svg';
import favorite from '../svg/favorite.svg';
import cart from '../svg/cart.svg';
import burger from '../../assets/svg/burger.svg';
import leave from '../../assets/svg/leave.svg';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { openCart, cartItems } = useCart();

    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleOpenCartFromMobile = () => {
        setIsOpen(false);
        requestAnimationFrame(() => {
            openCart();
        });
    };

    return (
        <header className="relative z-50 border-b bg-[#F9F1E3] py-4 shadow-sm border-black/5 font-sans">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

                <div className="shrink-0">
                    <Link to="/" onClick={() => setIsOpen(false)}>
                        <img src={logo} alt="Logo" className="h-10 w-auto md:h-14" />
                    </Link>
                </div>

                <nav className="hidden space-x-12 font-medium tracking-wide text-[#600000] text-[15px] md:flex items-center">
                    <Link to="/" className="transition-opacity hover:opacity-75">Главная</Link>
                    <Link to="/catalog" className="transition-opacity hover:opacity-75">Каталог</Link>
                    <button
                        type="button"
                        onClick={openCart}
                        className="transition-opacity hover:opacity-75 cursor-pointer"
                    >
                        Корзина
                    </button>
                </nav>

                <div className="flex items-center space-x-6">
                    <div className="hidden items-center space-x-6 md:flex">
                        <Link to="/favorite" className="transition-opacity hover:opacity-75">
                            <img src={favorite} alt="Favorite" className="h-6 w-6" />
                        </Link>


                        <button
                            type="button"
                            onClick={openCart}
                            className="relative transition-opacity hover:opacity-75 cursor-pointer"
                        >
                            <img src={cart} alt="Cart" className="h-6 w-6" />
                            {totalCount > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-[#600000] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalCount}
                                </span>
                            )}
                        </button>
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="block focus:outline-none md:hidden"
                    >
                        <img src={burger} alt="Open menu" className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="fixed top-0 right-0 z-50 h-full w-70 bg-[#F9F1E3] p-6 shadow-2xl md:hidden flex flex-col">
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="focus:outline-none"
                            >
                                <img src={leave} alt="Close menu" className="h-6 w-6" />
                            </button>
                        </div>

                        <nav className="flex flex-col text-[#600000] font-medium tracking-widest text-[16px] uppercase">
                            <Link to="/catalog" onClick={() => setIsOpen(false)} className="border-b border-black/20 py-4">Каталог</Link>
                            <Link to="/" onClick={() => setIsOpen(false)} className="border-b border-black/20 py-4">Главная</Link>
                            <button
                                type="button"
                                onClick={handleOpenCartFromMobile}
                                className="border-b border-black/20 py-4 text-left font-medium tracking-widest text-[16px] uppercase"
                            >
                                Корзина {totalCount > 0 && `(${totalCount})`}
                            </button>
                            <Link to="/favorite" onClick={() => setIsOpen(false)} className="border-b border-black/20 py-4">Избранное</Link>
                        </nav>
                    </div>
                </>
            )}
        </header>
    );
}

export default Header;