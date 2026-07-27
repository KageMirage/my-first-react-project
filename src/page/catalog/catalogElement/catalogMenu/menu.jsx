import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import CategoryFilter from './menuElement/CatFilter';
import ColorFilter from './menuElement/ColorFilter';
import PriceFilter from './menuElement/PriceFilter';
import MaterialFilter from './menuElement/MatFilter';
import FilterActions from './menuElement/FilterActions';

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    category: searchParams.get('category') || '',
    color: searchParams.get('color') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    material: searchParams.get('material') || '',
  }));

  useEffect(() => {
    setFilters({
      category: searchParams.get('category') || '',
      color: searchParams.get('color') || '',
      material: searchParams.get('material') || '',
      min_price: searchParams.get('min_price') || '',
      max_price: searchParams.get('max_price') || '',
    });
  }, [searchParams]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    const newParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  const handleReset = () => {
    setFilters({
      category: '',
      color: '',
      min_price: '',
      max_price: '',
      material: '',
    });
    setSearchParams({});
  };

  return (
    <aside className="w-full md:w-60 shrink-0 font-sans">
      <CategoryFilter
        selectedCategory={filters.category}
        onChange={(val) => handleChange('category', val)}
      />
      <ColorFilter
        selectedColor={filters.color}
        onChange={(val) => handleChange('color', val)}
      />
      <PriceFilter
        minPrice={filters.min_price}
        maxPrice={filters.max_price}
        onChange={handleChange}
      />
      <MaterialFilter
        selectedMaterial={filters.material}
        onChange={(val) => handleChange('material', val)}
      />

      <FilterActions onApply={handleApply} onReset={handleReset} />
    </aside>
  );
}

export default Menu;