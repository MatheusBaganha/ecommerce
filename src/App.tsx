import React from 'react';
import Navbar from './components/Navbar/Navbar';
import CartOfProducts from './components/Cart/CartOfProducts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './components/Products/Products';
import { commerceContext } from './context/ContextCommerce';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import { commerce } from './lib/commerce';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import { Cart } from '@chec/commerce.js/types/cart';

function App() {
  const { fetchProducts, fetchCart, addToCart, cart, setCart, products } =
    React.useContext(commerceContext);
  const [order, setOrder] = React.useState({} as CheckoutCaptureResponse);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleCaptureCheckout = async (
    checkoutTokenId: string,
    newOrder: CheckoutCapture,
  ) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder,
      );
      setOrder(incomingOrder);

      refreshCart();
    } catch (error: any) {
      refreshCart();
      setErrorMessage(error.data.error.message);
    }
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    console.log(newCart);
    setCart(newCart as Cart);
  };

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
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
