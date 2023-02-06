import React from 'react';
import { ReviewProps } from '../../types/types';

const Review = ({ checkoutToken }: ReviewProps) => {
  console.log(checkoutToken);
  return (
    <>
      <h3 className="tituloForm">Resumo do pedido</h3>
      <ul>
        {checkoutToken &&
          checkoutToken.line_items.map((product) => (
            <li key={product.name} className="eachItemSummary">
              <div>
                <h4 className="productName">{product.name}</h4>
                <span className="productQuantity">
                  Quantidade: {product.quantity}
                </span>
              </div>
              <span className="productPrice">
                {product.price.formatted_with_symbol}
              </span>
            </li>
          ))}
        <li className="containerTotal eachItemSummary">
          <h3>Total</h3>
          <span className="total">
            {checkoutToken && checkoutToken.total.formatted_with_symbol}
          </span>
        </li>
      </ul>
    </>
  );
};

export default Review;
