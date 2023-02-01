import { CartProps } from '../../types/types';
import CartItem from './CartItem/CartItem';

const CartOfProducts = ({ cart }: CartProps) => {
  const EmptyCart = () => {
    return <p>Não há produtos no carrinho.</p>;
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
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </h4>
          <div className="containerButtons">
            <button className="emptyButton">ESVAZIAR CARRINHO</button>
            <button className="checkoutButton">CHECKOUT</button>
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
