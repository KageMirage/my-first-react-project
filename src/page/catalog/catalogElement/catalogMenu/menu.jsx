import React, { useState, useEffect } from 'react';
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

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    color: searchParams.get('color') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    material: searchParams.get('material') || ''
  });

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

    const initialFilters = {};
    if (currentCategory) initialFilters.category = currentCategory;
    if (currentColor) initialFilters.color = currentColor;
    if (currentMaterial) initialFilters.material = currentMaterial;
    if (currentMinPrice) initialFilters.min_price = currentMinPrice;
    if (currentMaxPrice) initialFilters.max_price = currentMaxPrice;

    if (Object.keys(initialFilters).length > 0) {
      applyCatalogFilters(initialFilters);
    } else {
      resetCatalogFilters();
    }
  }, [searchParams]);

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    const cleanFilters = {};
    const newParams = new URLSearchParams();

    if (filters.category) {
      cleanFilters.category = filters.category;
      newParams.set('category', filters.category);
    }
    if (filters.color) {
      cleanFilters.color = filters.color;
      newParams.set('color', filters.color);
    }
    if (filters.material) {
      cleanFilters.material = filters.material;
      newParams.set('material', filters.material);
    }
    if (filters.min_price) {
      cleanFilters.min_price = filters.min_price;
      newParams.set('min_price', filters.min_price);
    }
    if (filters.max_price) {
      cleanFilters.max_price = filters.max_price;
      newParams.set('max_price', filters.max_price);
    }

    setSearchParams(newParams);
    applyCatalogFilters(cleanFilters);
  };

  // 4. При сбросе — очищаем все фильтры
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