import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { commerce } from './lib/commerce';
import { ProductTypes } from './types/types';
import { Cart } from '@chec/commerce.js/types/cart';
import CartOfProducts from './components/Cart/CartOfProducts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './components/Products/Products';

function App() {
  const [products, setProducts] = React.useState<ProductTypes[]>([]);
  const [cart, setCart] = React.useState({} as Cart);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    console.log(data);
    setProducts(data as ProductTypes[]);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const addToCart = async (productId: string, quantity: number) => {
    const item: unknown = await commerce.cart.add(productId, quantity);
    if (item) {
      setCart(item as Cart);
    }
  };

  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);

  return (
    <BrowserRouter>
      <Navbar totalItems={cart.total_items} />
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
