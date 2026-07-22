import { useGetProductsQuery, useGetCategoriesQuery } from './allData/products';

function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();

  if (isLoading) return <div>Загрузка...</div>;
  
  return <div>  </div>;
}