import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

import { CartProvider } from './data/allData/CartContext.jsx';
import { ProductsProvider } from './data/allData/products.jsx';
import { FavoritesProvider } from './data/allData/FavoriteCintext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ProductsProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </ProductsProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)


