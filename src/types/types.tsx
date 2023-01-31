import { Product } from '@chec/commerce.js/types/product';

export type ProductTypes = Product & {
  image: {
    created_at: number;
    description: string | null;
    file_extension: string;
    file_size: number;
    filename: string;
    id: string;
    image_dimensions: {
      width: number;
      heigth: number;
    };
    is_image: boolean;
    meta: Array<any>;
    updated_at: number;
    url: string;
  };
};

export type CartButtonProps = {
  onAddToCart: (productId: string, quantity: number) => Promise<void>;
};

export type ProductProps = CartButtonProps & {
  product: ProductTypes;
};

export type ProductsProps = CartButtonProps & {
  products: Array<ProductTypes>;
};

export type NavBarProps = {
  totalItems: number;
};
