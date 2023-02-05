import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';

interface FormData {
  name: string;
  lastName: string;
  adress: string;
  email: string;
  city: string;
  cep: string;
}

const AdressForm = ({ checkoutToken }: { checkoutToken: CheckoutToken }) => {
  const [shippingCountries, setShippingCountries] = React.useState([]);
  const [shippingCountry, setShippingCountry] = React.useState('');

  const [shippingSubdivisions, setSubdivisions] = React.useState([]);
  const [shippingSubdivision, setSubdivision] = React.useState('');

  const [shippingOptions, setShippingOptions] = React.useState([]);
  const [shippingOption, setShippingOption] = React.useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const fetchShippingCountries = async (checkoutTokenId: string) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId,
    );
    console.log(countries);
    setShippingCountries(countries as any);
    setShippingCountry(Object.keys(countries)[0]);
  };

  React.useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log(data);
  }
  console.log(errors.name);

  return (
    <div className="containerAdressForm">
      <h2 className="tituloForm">Endereço de Entrega</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          label="Nome"
          name="name"
          register={register}
          rules={{ required: true }}
        />
        {errors?.name?.type === 'required' && <p>Nome é obrigatorio.</p>}
        <FormInput
          type="text"
          label="Sobrenome"
          name="lastName"
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type="text"
          label="Endereço"
          name="adress"
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type="email"
          label="Email"
          name="email"
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type="text"
          label="Cidade"
          name="city"
          register={register}
          rules={{ required: true }}
        />
        <FormInput
          type="text"
          label="CEP"
          name="cep"
          register={register}
          rules={{ required: true }}
          placeholder="00000-000"
        />
        <select
          value={shippingCountry}
          name="country"
          id="country"
          className="input select"
          onChange={({ target }) => setShippingCountry(target.value)}
        >
          {countries.map((country) => (
            <option className="option" key={country.id} value={country.id}>
              {country.label}
            </option>
          ))}
        </select>
        {/* <button>Enviar</button> */}
      </form>
    </div>
  );
};

export default AdressForm;
