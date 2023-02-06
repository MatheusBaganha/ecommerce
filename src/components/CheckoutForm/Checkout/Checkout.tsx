import React from 'react';
import Confirmation from '../Confirmation';
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { CheckoutProps } from '../../../types/types';
import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';

const steps = ['Endereço de Entrega', 'Detalhes do Pagamento'];

const Checkout = ({ cart }: CheckoutProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [checkoutToken, setCheckoutToken] = React.useState<CheckoutToken>();
  const [shippingData, setShippingData] = React.useState({} as FormData);
  const cartType = cart as Cart;

  React.useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cartType.id, {
          type: 'cart',
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };

    generateToken();
  }, [cart]);

  function handleStep(currentIndexStep: number) {
    if (currentIndexStep === 0) {
      setActiveStep(0);
    }
    if (currentIndexStep === 1) {
      setActiveStep(1);
    }
  }

  function next(data: FormData) {
    setShippingData(data);
    console.log(data);
    nextStep();
  }

  function nextStep() {
    setActiveStep((previousStep) => previousStep + 1);
  }

  function backStep() {
    setActiveStep((previousStep) => previousStep - 1);
  }

  const Form = () =>
    activeStep === 0 ? (
      <AdressForm checkoutToken={checkoutToken!} next={next} />
    ) : (
      <PaymentForm shippingData={shippingData} />
    );

  return (
    <main className="checkoutContainer">
      <h2 className="checkoutTitle">Checkout</h2>
      <div className="containerSteps">
        {steps.map((step, index) => (
          <div
            key={step}
            className="eachStep"
            onClick={() => handleStep(index)}
          >
            <span
              className={`numberStep ${
                activeStep === index || activeStep === 2 ? 'active' : ' '
              }`}
            >
              {activeStep === 2 ? '✓' : index + 1}
            </span>
            <label className="nameStep">{step}</label>
          </div>
        ))}
      </div>
      {activeStep === steps.length ? (
        <Confirmation />
      ) : (
        checkoutToken && <Form />
      )}
    </main>
  );
};

export default Checkout;
