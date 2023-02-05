import { Cart } from '@chec/commerce.js/types/cart';
import { Product } from '@chec/commerce.js/types/product';
import { FieldError } from 'react-hook-form';

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

export type CartProps = {
  cart: Cart;
};

export type CartItemProps = {
  item: unknown;
};

export type CheckoutProps = {
  cart: unknown;
};

export type ProductInfoProps = {
  item: ProductTypes;
};

export type ContextCommerceTypes = {
  products: ProductTypes[];
  cart: Cart;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  emptyCart: () => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  fetchProducts: () => Promise<void>;
};

export type FormInputProps = {
  name: string;
  label: string;
  type: string;
  register: any;
  rules: unknown;
  required?: boolean;
  placeholder?: string;
};
