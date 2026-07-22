import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailProduct from './producktDatailElement/DatailProduckt';
import PassersbyCategory from './producktDatailElement/PassersbyCategory';
import HomeButton from './producktDatailElement/Leave';
import { useProducts } from '../../data/allData/products';

function ProducktDatails() {
  const { id } = useParams();
  const { catalogProducts } = useProducts();
  const [productCategory, setProductCategory] = useState(8);

  useEffect(() => {
    const productsList = Array.isArray(catalogProducts)
      ? catalogProducts
      : Array.isArray(catalogProducts?.results)
        ? catalogProducts.results
        : [];

    const product = productsList.find((item) => String(item.id) === String(id));
    if (product && product.category) {
      setProductCategory(product.category);
    }
  }, [id, catalogProducts]);

  return (
    <div>
      <HomeButton />
      <DetailProduct />
      <PassersbyCategory productCategory={productCategory} />
    </div>
  );
}

export default ProducktDatails;