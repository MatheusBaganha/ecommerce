import { ProductInfoProps } from '../types/types';

const ProductInfo = ({ item }: ProductInfoProps) => {
  return (
    <>
      <div className="containerCardImageProduct">
        <img src={item.image?.url} alt={`Foto do produto ${item.name}`} />
      </div>
      <div className="containerCardInfo">
        <h2 className="productName">{item.name}</h2>
        <p className="productPrice">{item.price.formatted_with_symbol}</p>
      </div>
    </>
  );
};

export default ProductInfo;
