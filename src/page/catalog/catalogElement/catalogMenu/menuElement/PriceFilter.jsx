import React, { useState } from 'react';

function PriceFilter({ minPrice, maxPrice, onChange }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="py-3 font-sans">
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer select-none py-1"
      >
        <h3 className="font-medium text-sm tracking-wider uppercase text-[#1a1a1a]">
          ЦЕНА
        </h3>
        <span className={`transform transition-transform duration-200 text-xs ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
          ∧
        </span>
      </div>

      {isOpen && (
        <div className="flex items-center gap-4 mt-3 mb-2">
          
          <div className="flex items-center gap-1.5 text-sm text-[#1a1a1a]">
            <span>От</span>
            <input 
              type="number"
              value={minPrice || ''}
              onChange={(e) => onChange('min_price', e.target.value)}
              className="w-full max-w-20 bg-transparent border-b border-[#1a1a1a] outline-none text-sm text-center py-0.5 focus:border-[#5c0000]"
            />
          </div>

          <div className="flex items-center gap-1.5 text-sm text-[#1a1a1a]">
            <span>До</span>
            <input 
              type="number"
              value={maxPrice || ''}
              onChange={(e) => onChange('max_price', e.target.value)}
              className="w-full max-w-20 bg-transparent border-b border-[#1a1a1a] outline-none text-sm text-center py-0.5 focus:border-[#5c0000]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PriceFilter;