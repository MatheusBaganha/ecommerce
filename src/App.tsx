import React from 'react';
import Navbar from './components/Navbar/Navbar';
import CartOfProducts from './components/Cart/CartOfProducts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import { commerceContext } from './context/ContextCommerce';

function App() {
  const { fetchProducts, fetchCart, addToCart, cart, products } =
    React.useContext(commerceContext);

  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <Navbar totalItems={cart && cart.total_items} />
      <Routes>
        <Route
          path="/"
          element={<Products products={products} onAddToCart={addToCart} />}
        />
        <Route path="/cart" element={<CartOfProducts cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
