import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';
import FormSelect from './FormSelect';
import { AdressFormProps, FormData } from '../../types/types';
import { Link } from 'react-router-dom';

const AdressForm = ({ checkoutToken, next }: AdressFormProps) => {
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

  const subdisivions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    }),
  );

  const options = shippingOptions.map((option: any) => ({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId: string) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId,
    );

    setShippingCountries(countries as any);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubDivisions = async (
    checkoutToken: string,
    countryCode: string,
  ) => {
    const { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        checkoutToken,
        countryCode,
      );

    setSubdivisions(subdivisions as any);
    setSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId: string,
    country: string,
    region?: string,
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country: country, region: region || undefined },
    );

    setShippingOptions(options as any);
    setShippingOption(options[0] as any);
  };

  React.useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  React.useEffect(() => {
    if (shippingCountry) fetchSubDivisions(checkoutToken.id, shippingCountry);
  }, [shippingCountry]);

  React.useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision,
      );
  }, [shippingSubdivision]);

  const { register, handleSubmit } = useForm<FormData>();

  return (
    <div className="containerAdressForm">
      <h2 className="tituloForm">Endereço de Entrega</h2>
      <form
        className="form"
        onSubmit={handleSubmit((data) =>
          next({
            ...data,
            country: shippingCountry,
            subdivision: shippingSubdivision,
            options: shippingOption,
          }),
        )}
      >
        <FormInput type="text" label="Nome" name="name" register={register} />
        <FormInput
          type="text"
          label="Sobrenome"
          name="lastName"
          register={register}
        />
        <FormInput
          type="text"
          label="Endereço"
          name="adress"
          register={register}
        />
        <FormInput
          type="email"
          label="Email"
          name="email"
          register={register}
        />
        <FormInput type="text" label="Cidade" name="city" register={register} />
        <FormInput
          type="text"
          label="CEP"
          name="cep"
          register={register}
          placeholder="00000-000"
        />
        <FormSelect
          label="País"
          register={register}
          name="country"
          value={shippingCountry}
          onChange={setShippingCountry}
          options={countries}
        />
        <FormSelect
          label="Estado"
          register={register}
          name="subdivision"
          value={shippingSubdivision}
          onChange={setSubdivision}
          options={subdisivions}
        />
        <FormSelect
          label="Taxa"
          register={register}
          name="options"
          value={shippingOption}
          onChange={setShippingOption}
          options={options}
        />
        <br />
        <div className="containerFormBtns">
          <button className="previous">
            <Link to={'/cart'}>VOLTAR AO CARRINHO</Link>
          </button>
          <button className="next" type="submit">
            PRÓXIMO
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdressForm;
