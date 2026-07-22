import React, { useState } from 'react';
import { useProducts } from '../../../../../data/allData/products';

function ColorFilter({ selectedColor, onChange }) {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(true);

  const productsList = Array.isArray(products) 
    ? products 
    : Array.isArray(products?.results) 
      ? products.results 
      : [];

  const allColors = productsList.flatMap((product) => product?.colors || []);

  const uniqueColors = Array.from(
    new Map(
      allColors
        .filter((color) => color && color.id)
        .map((color) => [color.id, color])
    ).values()
  );

  return (
    <div className="py-3 border-y border-[#1a1a1a]/20 font-sans">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer select-none py-1"
      >
        <h3 className="font-medium text-sm tracking-wider uppercase text-[#1a1a1a]">
          ЦВЕТА
        </h3>
        <span className={`transform transition-transform duration-200 text-xs ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
          ∧
        </span>
      </div>

      {isOpen && (
        <div className="flex flex-wrap gap-2 mt-3">
          {uniqueColors.length > 0 ? (
            uniqueColors.map((color) => {
              const isSelected = selectedColor === color.id;

              return (
                <button
                  key={color.id}
                  type="button"
                  title={color.title || color.name}
                  onClick={() => onChange(isSelected ? '' : color.id)}
                  style={{ backgroundColor: color.hex_code || '#cccccc' }}
                  className={`w-5 h-5 rounded-full border border-gray-300 cursor-pointer transition-transform duration-150 ${
                    isSelected 
                      ? 'ring-2 ring-offset-1 ring-[#5c0000] scale-110' 
                      : 'hover:scale-105 opacity-90 hover:opacity-100'
                  }`}
                />
              );
            })
          ) : (
            <p className="text-xs text-gray-400">Нет доступных цветов</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ColorFilter;