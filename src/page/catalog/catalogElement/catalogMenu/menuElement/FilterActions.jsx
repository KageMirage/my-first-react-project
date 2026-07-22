import React from 'react';

function FilterActions({ onApply, onReset }) {
  return (
    <div className="flex flex-col gap-3 mt-6">
      
      <button
        type="button"
        onClick={onApply}
        className="w-full bg-[#5c0000] text-white py-3 px-4 text-sm tracking-wider uppercase hover:bg-[#4a0000] transition-colors cursor-pointer"
      >
        Применить
      </button>

      <button
        type="button"
        onClick={onReset}
        className="w-full border border-[#5c0000] text-[#1a1a1a] py-3 px-4 text-sm tracking-wider uppercase hover:bg-black/5 transition-colors cursor-pointer"
      >
        Сбросить
      </button>

    </div>
  );
}

export default FilterActions;