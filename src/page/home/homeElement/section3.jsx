import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../data/allData/redux/addData/cartSlice.jsx';
import { toggleFavorite } from '../../../data/allData/redux/addData/favoritesSlice.jsx'

import { useGetFilteredProductsQuery } from '../../../data/allData/products';
import { ProductSectionSkeleton } from '../../sceleton/ProductSkeleton.jsx';

import img1 from '../../../assets/img/img1.png';
import img2 from '../../../assets/img/img2.png';
import img3 from '../../../assets/img/img3.png';
import img4 from '../../../assets/img/img4.png';
import cartIcon from '../../../assets/svg/cartIcon.svg';

function Section3({ productCategory = 2 }) {
    const dispatch = useDispatch();

    const favoriteItems = useSelector((state) => state.favorites?.items || []);

    const [addedIds, setAddedIds] = useState({});
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    const fallbackImages = [img1, img2, img3, img4];
    const categoryId = typeof productCategory === 'object' ? productCategory?.id : productCategory;

    const { data: rawData, isLoading: loading, error } = useGetFilteredProductsQuery({ category: categoryId || 2 });

    const productsArray = Array.isArray(rawData) ? rawData : rawData?.results || [];
    const displayedProducts = productsArray.slice(0, 4);

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

    return (
        <section className="bg-[#FDF4E3] px-4 md:px-10 py-10 md:py-16 text-[#1a1a1a] font-sans">
            <h2 className="font-serif text-3xl md:text-4xl mb-6 md:mb-10 pl-2">Новинки</h2>

            {loading ? (
                <ProductSectionSkeleton count={4} />
            ) : error ? (
                <div className="text-center py-12 text-red-600 px-4">
                    Ошибка загрузки: {typeof error === 'object' ? JSON.stringify(error) : error}
                </div>
            ) : displayedProducts.length === 0 ? (
                <p className="text-center py-10 text-gray-500">Новых товаров пока нет</p>
            ) : (
                <div className="flex flex-col items-center">
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="w-full flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:pb-0"
                    >
                        {displayedProducts.map((product, index) => {
                            const defaultFallback = fallbackImages[index % fallbackImages.length];
                            const imageSrc = product.image || defaultFallback;
                            const price = product.price ? Math.floor(Number(product.price)) : 0;
                            const isFav = checkIsFavorite(product.id);
                            const isAdded = addedIds[product.id];

                            return (
                                <div key={product.id || index} className="group flex flex-col min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-start">
                                    <div className="relative w-full aspect-3/4 overflow-hidden mb-3.5 bg-gray-100 rounded-sm">
                                        <Link to={`/product/${product.id}`} className="block w-full h-full">
                                            <img
                                                src={imageSrc}
                                                alt={product.title || 'Новинка'}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = defaultFallback;
                                                }}
                                            />
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => handleToggleFavorite(product)}
                                            className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 z-10 cursor-pointer"
                                            aria-label={isFav ? "Удалить из избранного" : "Добавить в избранное"}
                                        >
                                            <svg className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-200" viewBox="0 0 24 24" fill={isFav ? "#6A0008" : "none"} stroke={isFav ? "#6A0008" : "#1a1a1a"} strokeWidth="2">
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
                                            <img src={cartIcon} alt="Добавить в корзину" className="w-5 h-5" />
                                            {isAdded && (
                                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                </span>
                                            )}
                                        </button>
                                    </div>

                                    <span className="text-xs md:text-sm text-gray-500 font-light">
                                        {product.country || "Турция"}
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

export default Section3;