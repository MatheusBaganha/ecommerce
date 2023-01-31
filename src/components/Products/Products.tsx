import Product from './Product/Product';
import { ProductsProps } from '../../types/types';

const Products = ({ products, onAddToCart }: ProductsProps) => {
  return (
    <main className="containerGeralProducts">
      {products.map((product) => {
        return (
          <Product
            product={product}
            key={product.id}
            onAddToCart={onAddToCart}
          />
        );
      })}
    </main>
  );
};

export default Products;
