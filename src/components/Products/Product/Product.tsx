import { ProductProps } from '../../../types/types';
import CartButton from './CartButton';

const Product = ({ product }: ProductProps) => {
  return (
    <article className="containerCardProduct">
      <div className="containerCardImageProduct">
        <img src={product.image.url} alt="Imagem do produto" />
      </div>
      <div className="containerCardInfo">
        <h2 className="productName">{product.name}</h2>
        <p className="productPrice">{product.price.formatted_with_symbol}</p>
      </div>
      <div className="containerDescriptionAndCart">
        <p className="productDescription">
          {product.description.replace(/<p>(.*?)<\/p>/g, '$1')}
        </p>
        <CartButton />
      </div>
    </article>
  );
};

export default Product;
