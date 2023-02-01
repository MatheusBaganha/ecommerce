import { ProductProps } from '../../../types/types';
import ProductInfo from '../../ProductInfo';
import CartButton from './CartButton';

const Product = ({ product, onAddToCart }: ProductProps) => {
  return (
    <article className="containerCardProduct">
      <ProductInfo item={product} />
      <div className="containerDescriptionAndCart">
        <p className="productDescription">
          {product.description.replace(/<p>(.*?)<\/p>/g, '$1')}
        </p>
        <div onClick={() => onAddToCart(product.id, 1)}>
          <CartButton />
        </div>
      </div>
    </article>
  );
};

export default Product;
