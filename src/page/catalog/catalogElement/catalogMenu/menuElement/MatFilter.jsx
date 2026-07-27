import React, { useState } from 'react';
import { useGetFilteredProductsQuery } from '../../../../../data/allData/products';

function MatFilter({ selectedMaterial, onChange }) {
  const { data: rawData = [], isLoading } = useGetFilteredProductsQuery();
  const [isOpen, setIsOpen] = useState(true);

  const productsList = Array.isArray(rawData) 
    ? rawData 
    : Array.isArray(rawData?.results) 
      ? rawData.results 
      : [];

  const allMaterials = productsList
    .flatMap((p) => p?.materials || p?.material || [])
    .filter(Boolean);

  const uniqueMaterials = Array.from(
    new Map(
      allMaterials.map((mat) => {
        const id = typeof mat === 'object' ? mat?.id : mat;
        return [id, mat];
      })
    ).values()
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
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
          {isLoading ? (
            <p className="text-xs text-gray-400">Загрузка материалов...</p>
          ) : uniqueMaterials.length > 0 ? (
            uniqueMaterials.map((mat) => {
              const matId = typeof mat === 'object' ? mat?.id : mat;
              const matTitle = typeof mat === 'object' ? (mat?.title || mat?.name) : mat;
              const isChecked = selectedMaterial !== '' && String(selectedMaterial) === String(matId);

              return (
                <label 
                  key={matId} 
                  className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wide hover:opacity-75 transition-opacity"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onChange(isChecked ? '' : matId)}
                    className="w-3.5 h-3.5 accent-[#5c0000] cursor-pointer shrink-0"
                  />
                  <span className="truncate">{matTitle}</span>
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