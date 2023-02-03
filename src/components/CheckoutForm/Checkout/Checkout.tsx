import React from 'react';
import Confirmation from '../Confirmation';
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Endereço de Entrega', 'Detalhes do Pagamento'];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  function handleStep(currentIndexStep: number) {
    if (currentIndexStep === 0) {
      setActiveStep(0);
    }
    if (currentIndexStep === 1) {
      setActiveStep(1);
    }
  }

  const Form = () => (activeStep === 0 ? <AdressForm /> : <PaymentForm />);

  return (
    <main className="checkoutContainer">
      <h2 className="checkoutTitle">Checkout</h2>
      <div className="containerSteps">
        {steps.map((step, index) => (
          <div className="eachStep" onClick={() => handleStep(index)}>
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
      {activeStep === steps.length ? <Confirmation /> : <Form />}
    </main>
  );
};

export default Checkout;
