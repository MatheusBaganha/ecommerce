import React from 'react';
import { PaymentFormProps } from '../../types/types';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const PaymentForm = ({ shippingData, checkoutToken }: PaymentFormProps) => {
  return (
    <div className="containerForm">
      <Review checkoutToken={checkoutToken} />
    </div>
  );
};

export default PaymentForm;
