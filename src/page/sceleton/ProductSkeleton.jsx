import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="flex flex-col min-w-[85%] sm:min-w-[45%] md:min-w-0 animate-pulse w-full">
      <div className="w-full aspect-3/4 bg-gray-300/60 rounded-sm mb-3.5"></div>

      <div className="flex justify-between items-center mb-1.5">
        <div className="h-5 bg-gray-300/60 rounded w-1/3"></div>
        <div className="w-7 h-7 bg-gray-300/60 rounded-full"></div>
      </div>

      <div className="h-3 bg-gray-300/60 rounded w-1/4"></div>
    </div>
  );
}

export function ProductSectionSkeleton({ count = 4 }) {
  return (
    <div className="w-full flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductSkeleton;