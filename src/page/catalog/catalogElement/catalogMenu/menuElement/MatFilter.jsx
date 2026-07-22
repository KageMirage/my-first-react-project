import React, { useState } from 'react';
import { useProducts } from '../../../../../data/allData/products';

function MatFilter({ selectedMaterial, onChange }) {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(true);

  const productsList = Array.isArray(products) 
    ? products 
    : Array.isArray(products?.results) 
      ? products.results 
      : [];

  const allMaterials = productsList.map((p) => p.material).filter(Boolean);

  const uniqueMaterials = Array.from(
    new Map(allMaterials.map((mat) => [mat.id, mat])).values()
  );

  return (
    <div className="py-3 border-y border-[#1a1a1a]/20 font-sans">
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer select-none py-1 mb-2"
      >
        <h3 className="font-medium text-sm tracking-wider uppercase text-[#1a1a1a]">
          Материалы
        </h3>
        <span className={`transform transition-transform duration-200 text-xs ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
          ∧
        </span>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2">
          {uniqueMaterials.length > 0 ? (
            uniqueMaterials.map((mat) => {
              const isChecked = selectedMaterial === mat.id;

              return (
                <label 
                  key={mat.id} 
                  className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wide hover:opacity-75 transition-opacity"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onChange(isChecked ? '' : mat.id)}
                    className="w-3.5 h-3.5 accent-[#5c0000] cursor-pointer"
                  />
                  <span>{mat.title}</span>
                </label>
              );
            })
          ) : (
            <p className="text-xs text-gray-400">Нет доступных материалов</p>
          )}
        </div>
      )}

    </div>
  );
}

export default MatFilter;