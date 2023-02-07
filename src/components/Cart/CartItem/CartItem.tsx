import React from 'react';
import { CartItemProps, ProductTypes } from '../../../types/types';
import ProductInfo from '../../ProductInfo';
import { LineItem } from '@chec/commerce.js/types/line-item';
import { commerceContext } from '../../../context/ContextCommerce';

const CartItem = ({ item }: CartItemProps) => {
  const { updateCartQuantity, removeFromCart } =
    React.useContext(commerceContext);
  const itemAsProduct = item as LineItem;
  return (
    <div className="containerCardProduct">
      <ProductInfo item={item as ProductTypes} />
      <div className="cardActions">
        <div className="cartItemButtons">
          <button
            className="minusAndPlusButton"
            onClick={() =>
              updateCartQuantity(itemAsProduct.id, itemAsProduct.quantity - 1)
            }
          >
            -
          </button>
          <p className="quantity">{itemAsProduct.quantity}</p>
          <button
            className="minusAndPlusButton"
            onClick={() =>
              updateCartQuantity(itemAsProduct.id, itemAsProduct.quantity + 1)
            }
          >
            +
          </button>
        </div>
        <button
          className="removeButton emptyButton"
          onClick={() => removeFromCart(itemAsProduct.id)}
        >
          REMOVER
        </button>
      </div>
    </div>
  );
};

export default CartItem;
