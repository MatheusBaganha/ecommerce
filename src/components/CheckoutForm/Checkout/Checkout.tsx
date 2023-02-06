import React from 'react';
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { CheckoutProps, FormData } from '../../../types/types';
import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { Link, useNavigate } from 'react-router-dom';
import completed from '../../../assets/completed.svg';

const steps = ['Endereço de Entrega', 'Detalhes do Pagamento'];

const Checkout = ({ cart, order, onCaptureCheckout, error }: CheckoutProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [checkoutToken, setCheckoutToken] = React.useState<CheckoutToken>();
  const [shippingData, setShippingData] = React.useState({} as FormData);
  const [isFinished, setIsFinished] = React.useState(false);
  const cartType = cart as Cart;
  const navigate = useNavigate();

  React.useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cartType.id, {
          type: 'cart',
        });
        setCheckoutToken(token);
      } catch (error) {
        navigate('/');
      }
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
    nextStep();
  }

  function nextStep() {
    setActiveStep((previousStep) => previousStep + 1);
  }

  function backStep() {
    setActiveStep((previousStep) => previousStep - 1);
  }

  function timeOut() {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  }

  const Form = () =>
    activeStep === 0 ? (
      <AdressForm checkoutToken={checkoutToken!} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken!}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        timeOut={timeOut}
      />
    );

  let Confirmation = () =>
    order.customer ? (
      <div>
        <h3>
          Obrigado por comprar conosco, {order.customer.firstname}{' '}
          {order.customer.lastname}
        </h3>
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
        <h4>Referência do Pedido: {order.customer_reference}</h4>
      </div>
    ) : isFinished ? (
      <div style={{ paddingBottom: '64px' }}>
        <h3
          style={{
            textAlign: 'center',
            margin: '42px auto',
          }}
        >
          Obrigado por comprar conosco!
        </h3>
        <div
          style={{ maxWidth: '300px', margin: '0 auto', paddingBottom: '64px' }}
        >
          <img src={completed} />
        </div>
        <button
          className="previous"
          style={{ display: 'block', margin: '0 auto' }}
        >
          <Link to={'/'}>Voltar para home</Link>
        </button>
      </div>
    ) : (
      <div
        style={{
          textAlign: 'center',
          margin: '36px auto',
          paddingBottom: '18px',
        }}
      >
        Loading...
      </div>
    );

  if (error) {
    <h3>Error: {error}</h3>;
  }
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
