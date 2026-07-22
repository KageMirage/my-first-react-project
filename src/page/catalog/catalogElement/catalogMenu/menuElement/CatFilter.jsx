import React, { useState } from 'react';
import { useProducts } from '../../../../../data/allData/products';

function CategoryFilter({ selectedCategory, onChange }) {
  const { categories, categoriesLoading } = useProducts();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="py-3 border-y border-[#1a1a1a]/20 font-sans">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer select-none py-1 mb-2"
      >
        <h3 className="font-medium text-sm tracking-wider uppercase text-[#1a1a1a]">
          Категории
        </h3>
        <span className={`transform transition-transform duration-200 text-xs ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
          ∧
        </span>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
          {categoriesLoading ? (
            <span className="text-xs text-gray-400">Загрузка категорий...</span>
          ) : categories && categories.length > 0 ? (
            categories.map((cat) => {
              const catId = cat.id;
              const catTitle = cat.title || cat.name;
              const isChecked = selectedCategory !== '' && selectedCategory !== null && String(selectedCategory) === String(catId);

              return (
                <label key={catId} className="flex items-center gap-2 cursor-pointer text-xs uppercase hover:opacity-80">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onChange(isChecked ? '' : catId)}
                    className="w-3.5 h-3.5 accent-[#5c0000] cursor-pointer shrink-0"
                  />
                  <span className="truncate">{catTitle}</span>
                </label>
              );
            })
          ) : (
            <span className="text-xs text-gray-400">Категории не найдены</span>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;