import React from 'react';
import Product from './Product/Product';

const products = [
  {
    id: 1,
    name: 'Shoes',
    description: 'Running Shoes.',
    price: 'R$ 79,99',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
  {
    id: 2,
    name: 'Apple Macbook',
    description: 'Apple Macbok is the fastest.',
    price: 'R$ 5400,00',
    image:
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
];

const Products = () => {
  return (
    <main className="containerGeralProducts">
      {products.map((product) => {
        return <Product product={product} key={product.id} />;
      })}
    </main>
  );
};

export default Products;
