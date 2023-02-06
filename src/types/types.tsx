import { Cart } from '@chec/commerce.js/types/cart';
import { Product } from '@chec/commerce.js/types/product';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';

interface newCheckoutToken extends CheckoutToken {
  total?: any;
}

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
  order: CheckoutCaptureResponse;
  onCaptureCheckout: (
    checkoutTokenId: string,
    newOrder: CheckoutCapture,
  ) => Promise<void>;
  error: string;
};

export type ProductInfoProps = {
  item: ProductTypes;
};

export type ContextCommerceTypes = {
  products: ProductTypes[];
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  emptyCart: () => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  fetchProducts: () => Promise<void>;
};

export type AdressFormProps = {
  checkoutToken: CheckoutToken;
  next: (data: FormData) => void;
};

export type PaymentFormProps = {
  shippingData: FormData;
  checkoutToken: newCheckoutToken;
  backStep: () => void;
  nextStep: () => void;
  onCaptureCheckout: (
    checkoutTokenId: string,
    newOrder: CheckoutCapture,
  ) => Promise<void>;
  timeOut: () => void;
};

export type ReviewProps = {
  checkoutToken: newCheckoutToken;
};

export type FormInputProps = {
  name: string;
  label: string;
  type: string;
  register: any;
  placeholder?: string;
};

export type FormSelectProps = {
  name: string;
  label: string;
  register: any;
  value: any;
  onChange: any;
  options: any;
};

export interface FormData {
  name: string;
  lastName: string;
  adress: string;
  email: string;
  city: string;
  cep: string;
  country: string;
  subdivision: string;
  options: string;
}
