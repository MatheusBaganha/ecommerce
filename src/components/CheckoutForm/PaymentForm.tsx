import React from 'react';
import { PaymentFormProps } from '../../types/types';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  shippingData,
  checkoutToken,
  backStep,
  onCaptureCheckout,
  nextStep,
  timeOut,
}: PaymentFormProps) => {
  const handleSubmit = async (
    e: React.FormEvent,
    elements: any,
    stripe: any,
  ) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.name,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData.adress,
          town_city: shippingData.city,
          country_state: shippingData.subdivision,
          postal_zip_code: shippingData.cep,
          country: shippingData.country,
        },
        fulfillment: {
          shipping_method: shippingData.options,
        },
        payment: {
          gateway: 'stripe',
          stripe: { payment_method_id: paymentMethod.id },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);
      timeOut();
      nextStep();
    }
  };

  return (
    <div className="containerForm">
      <Review checkoutToken={checkoutToken} />
      <span
        style={{
          content: '',
          display: 'block',
          width: '100%',
          height: '2px',
          marginBottom: '32px',
          backgroundColor: 'lightgray',
          borderRadius: '4px',
        }}
      ></span>
      <div>
        <h3 className="tituloForm">Método de Pagamento</h3>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form
                className="form"
                onSubmit={(e) => handleSubmit(e, elements, stripe)}
              >
                <CardElement />
                <br />
                <br />
                <div className="containerFormBtns">
                  <button onClick={backStep} className="previous">
                    Voltar
                  </button>
                  <button type="submit" disabled={!stripe} className="next">
                    Pagar {checkoutToken.total.formatted_with_symbol}
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentForm;
