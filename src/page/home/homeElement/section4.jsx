import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../../../data/allData/redux/addData/cartSlice.jsx';
import { toggleFavorite, selectFavoriteItems } from '../../../data/allData/redux/addData/favoritesSlice.jsx';
import { useGetFilteredProductsQuery } from '../../../data/allData/products';
import { SectionSkeleton } from '../../sceleton/SectionSceleton.jsx';

import firstFallback from '../svg/s41.svg';
import secondFallback from '../svg/s42.svg';
import thirdFallback from '../svg/s43.svg';
import cartIcon from '../../../assets/svg/cartIcon.svg';

const FALLBACK_IMAGES = [firstFallback, secondFallback, thirdFallback];

function Section4({ productCategory = 30 }) {
    const dispatch = useDispatch();
    const favoriteItems = useSelector(selectFavoriteItems) || [];
    const [addedIds, setAddedIds] = useState({});

    const categoryId = typeof productCategory === 'object' ? productCategory?.id : productCategory;
    const { data: rawData, isLoading: loading, error } = useGetFilteredProductsQuery({ category: categoryId || 2 });

    const productsArray = Array.isArray(rawData) ? rawData : rawData?.results || [];
    const displayedProducts = productsArray.slice(0, 3).reverse();

    const handleAddToCart = (product) => {
        dispatch(addToCart({ product, quantity: 1 }));
        setAddedIds((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => setAddedIds((prev) => ({ ...prev, [product.id]: false })), 1000);
    };

    return (
        <section className="bg-[#FDF4E3] px-4 md:px-10 py-10 md:py-16 text-[#1a1a1a] font-sans">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-serif text-3xl md:text-5xl mb-6 md:mb-10">В тренде</h2>

                {loading ? (
                    <SectionSkeleton />
                ) : error ? (
                    <div className="text-center py-12 text-red-600">
                        Ошибка загрузки: {typeof error === 'object' ? JSON.stringify(error) : error}
                    </div>
                ) : displayedProducts.length === 0 ? (
                    <p className="text-center py-10 text-gray-500">Товаров пока нет</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 md:gap-8 md:grid-flow-col">
                        {displayedProducts.map((product, idx) => {
                            const isLarge = idx === 2; // Третий товар (большой 😡 не обрашайте внимание:(можно же было в ряд почемууу бальшой и маленкий 😭😭😭😭😭😭😭😭😭😭))

                            return (
                                <div 
                                    key={product.id || idx} 
                                    className={isLarge ? "md:col-span-2 md:row-span-2 flex flex-col h-full justify-between" : "flex flex-col h-full"}
                                >
                                    <ProductCard
                                        product={product}
                                        fallback={FALLBACK_IMAGES[idx]}
                                        aspectClass={isLarge ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[4/3]"}
                                        containerClass="h-full justify-between"
                                        isFav={favoriteItems.some((item) => String(item.id) === String(product.id))}
                                        isAdded={addedIds[product.id]}
                                        onToggleFavorite={() => dispatch(toggleFavorite(product))}
                                        onAddToCart={() => handleAddToCart(product)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

function ProductCard({ 
    product, 
    fallback, 
    aspectClass = "aspect-[4/3]", 
    containerClass = "",
    isFav, 
    isAdded, 
    onToggleFavorite, 
    onAddToCart 
}) {
    const imageSrc = product?.image || fallback;

    return (
        <div className={`group flex flex-col w-full ${containerClass}`}>
            <div className={`relative w-full ${aspectClass} overflow-hidden mb-3 bg-gray-200/50 rounded-sm`}>
                <Link to={product?.id ? `/product/${product.id}` : '#'} className="block w-full h-full">
                    <img
                        src={imageSrc}
                        alt={product?.title || 'Товар'}
                        className="w-full h-full object-cover block"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallback;
                        }}
                    />
                </Link>

                {product?.id && (
                    <button
                        type="button"
                        onClick={onToggleFavorite}
                        className="absolute top-3 right-3 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 z-10 cursor-pointer"
                        aria-label={isFav ? "Удалить из избранного" : "Добавить в избранное"}
                    >
                        <svg className="w-5 h-5 transition-colors duration-200" viewBox="0 0 24 24" fill={isFav ? "#6A0008" : "none"} stroke={isFav ? "#6A0008" : "#1a1a1a"} strokeWidth="2">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="flex justify-between items-center mb-0.5">
                <h4 className="text-base md:text-lg font-semibold text-[#1a1a1a] truncate pr-2">
                    {product?.title || product?.name || "Название товара"}
                </h4>
                {product?.id && (
                    <button
                        type="button"
                        onClick={onAddToCart}
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
                )}
            </div>

            <p className="text-xs md:text-sm text-[#767676]">Все еще в тренде</p>
        </div>
    );
} 

//┗( T﹏T )┛┗( T﹏T )┛┗( T﹏T )┛ можно было в ряд зачем так заморачиватся? :( :( :( :( :( :( :( :(

export default Section4;