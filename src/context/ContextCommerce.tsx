import React, { ReactNode } from 'react';
import { ContextCommerceTypes, ProductTypes } from '../types/types';
import { Cart } from '@chec/commerce.js/types/cart';
import { commerce } from '../lib/commerce';

export const commerceContext = React.createContext({} as ContextCommerceTypes);

export const ContextCommerce = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = React.useState<ProductTypes[]>([]);
  const [cart, setCart] = React.useState({} as Cart);

  console.log(cart);

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

  const updateCartQuantity = async (productId: string, quantity: number) => {
    const response: unknown = await commerce.cart.update(productId, {
      quantity,
    });
    if (response) {
      setCart(response as Cart);
    }
  };

  const removeFromCart = async (productId: string) => {
    const response: unknown = await commerce.cart.remove(productId);
    if (response) {
      setCart(response as Cart);
    }
  };

  const emptyCart = async () => {
    const response: unknown = await commerce.cart.empty();
    if (response) {
      setCart(response as Cart);
    }
  };

  return (
    <commerceContext.Provider
      value={{
        products,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        emptyCart,
        updateCartQuantity,
        fetchCart,
        fetchProducts,
      }}
    >
      {children}
    </commerceContext.Provider>
  );
};
