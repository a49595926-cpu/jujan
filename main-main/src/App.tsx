import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { HomePage } from '@/pages/HomePage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:category/:slug" element={<ProductDetailPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
