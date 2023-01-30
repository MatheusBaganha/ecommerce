import React from 'react';
import Product from './Product/Product';
import { ProductsProps } from '../../types/types';

const Products = ({ products }: ProductsProps) => {
  return (
    <main className="containerGeralProducts">
      {products.map((product) => {
        return <Product product={product} key={product.id} />;
      })}
    </main>
  );
};

export default Products;
