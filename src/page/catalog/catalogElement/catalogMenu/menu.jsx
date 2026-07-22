import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../../../data/allData/products';

import CategoryFilter from './menuElement/CatFilter';
import ColorFilter from './menuElement/ColorFilter';
import PriceFilter from './menuElement/PriceFilter';
import MaterialFilter from './menuElement/MatFilter';
import FilterActions from './menuElement/FilterActions';

function Menu() {
  const { applyCatalogFilters, resetCatalogFilters } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    category: searchParams.get('category') || '',
    color: searchParams.get('color') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    material: searchParams.get('material') || ''
  }));

  // Синхронизация состояния фильтров с URL-параметрами
  useEffect(() => {
    const currentCategory = searchParams.get('category') || '';
    const currentColor = searchParams.get('color') || '';
    const currentMaterial = searchParams.get('material') || '';
    const currentMinPrice = searchParams.get('min_price') || '';
    const currentMaxPrice = searchParams.get('max_price') || '';

    setFilters({
      category: currentCategory,
      color: currentColor,
      material: currentMaterial,
      min_price: currentMinPrice,
      max_price: currentMaxPrice
    });

    const activeFilters = {};
    if (currentCategory) activeFilters.category = currentCategory;
    if (currentColor) activeFilters.color = currentColor;
    if (currentMaterial) activeFilters.material = currentMaterial;
    if (currentMinPrice) activeFilters.min_price = currentMinPrice;
    if (currentMaxPrice) activeFilters.max_price = currentMaxPrice;

    if (Object.keys(activeFilters).length > 0) {
      applyCatalogFilters(activeFilters);
    } else {
      resetCatalogFilters();
    }
  }, [searchParams, applyCatalogFilters, resetCatalogFilters]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Применение фильтров
  const handleApply = () => {
    const cleanFilters = {};
    const newParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        cleanFilters[key] = value;
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
    applyCatalogFilters(cleanFilters);
  };

  // Сброс фильтров
  const handleReset = () => {
    const emptyFilters = {
      category: '',
      color: '',
      min_price: '',
      max_price: '',
      material: ''
    };
    setFilters(emptyFilters);
    setSearchParams({});
    resetCatalogFilters();
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