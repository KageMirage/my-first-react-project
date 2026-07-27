import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailProduct from './producktDatailElement/DatailProduckt';
import PassersbyCategory from './producktDatailElement/PassersbyCategory';
import HomeButton from './producktDatailElement/Leave';

import { useGetProductByIdQuery, useGetFilteredProductsQuery } from '../../data/allData/products';

function ProducktDatails() {
  const { id } = useParams();
  const [productCategory, setProductCategory] = useState(8);

  const { data: product } = useGetProductByIdQuery(id, { skip: !id });


  useEffect(() => {
    if (product && product.category) {
      const categoryId = typeof product.category === 'object' 
        ? product.category.id 
        : product.category;

      if (categoryId) {
        setProductCategory(categoryId);
      }
    }
  }, [product]);

  return (
    <div>
      <HomeButton />
      <DetailProduct />
      <PassersbyCategory productCategory={productCategory} />
    </div>
  );
}

export default ProducktDatails;