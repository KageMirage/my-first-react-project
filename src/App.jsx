import { React, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Default from './defult/def';

const Home = lazy(() => import('./page/home/home'));
const Catalog = lazy(() => import('./page/catalog/catalog'));
const Favoryte = lazy(() => import('./page/favoryte/favoryte'));
const ProductDetail = lazy(() => import('./page/producktDatail/ProducktDatails'));
const ErrorDefault = lazy(() => import('./page/error101/er'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-[#5b0000] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Default />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/favorite" element={<Favoryte />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
        </Route>
          <Route path="*" element={<ErrorDefault />} />
      </Routes>
    </Suspense>
  );
}

export default App;