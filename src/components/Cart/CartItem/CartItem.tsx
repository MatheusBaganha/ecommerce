import React from 'react';
import { CartItemProps, ProductTypes } from '../../../types/types';
import ProductInfo from '../../ProductInfo';
import { LineItem } from '@chec/commerce.js/types/line-item';

const CartItem = ({ item }: CartItemProps) => {
  const itemAsProduct = item as LineItem;
  return (
    <div className="containerCardProduct">
      <ProductInfo item={item as ProductTypes} />
      <div className="cardActions">
        <div className="cartItemButtons">
          <button className="minusAndPlusButton">-</button>
          <p className="quantity">{itemAsProduct.quantity}</p>
          <button className="minusAndPlusButton">+</button>
        </div>
        <button className="removeButton">Remover</button>
      </div>
    </div>
  );
};

export default CartItem;
