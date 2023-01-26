import React from 'react';
import { ProductProps } from '../../../types/types';
import CartButton from './CartButton';

const Product = ({ product }: ProductProps) => {
  return (
    <article className="containerCardProduct">
      <div className="containerCardImageProduct">
        <img src={product.image} alt="Imagem do produto" />
      </div>
      <div className="containerCardInfo">
        <h2 className="productName">{product.name}</h2>
        <p className="productPrice">{product.price}</p>
      </div>
      <div className="containerDescriptionAndCart">
        <p className="productDescription">{product.description}</p>
        <CartButton />
      </div>
    </article>
  );
};

export default Product;
