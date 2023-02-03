import React from 'react';
import { commerceContext } from '../../context/ContextCommerce';
import { CartProps } from '../../types/types';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const CartOfProducts = ({ cart }: CartProps) => {
  const { emptyCart } = React.useContext(commerceContext);

  const EmptyCart = () => {
    return (
      <p className="emptyCartMessage">
        Não há produtos no carrinho.
        <Link to="/"> Clique aqui para adicionar produtos.</Link>
      </p>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <div className="containerGeralProducts">
          {cart.line_items.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
        <div className="cardDetails">
          <h4 className="subtotal">
            Total: {cart.subtotal.formatted_with_symbol}
          </h4>
          <div className="containerButtons">
            <button className="emptyButton" onClick={emptyCart}>
              ESVAZIAR CARRINHO
            </button>
            <button className="checkoutButton">
              <Link to={'/checkout'}>CHECKOUT</Link>
            </button>
          </div>
        </div>
      </>
    );
  };

  if (!cart.line_items) return <p>Loading...</p>;
  return (
    <section className="containerCart">
      <h3 className="cartTitle">Seu Carrinho de Compras</h3>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </section>
  );
};

export default CartOfProducts;
