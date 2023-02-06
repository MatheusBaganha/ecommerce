import React from 'react';
import { FormInputProps } from '../../types/types';

const FormInput = ({
  name,
  type,
  label,
  register,
  placeholder,
}: FormInputProps) => {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input"
        type={type}
        id={name}
        {...register(name, { required: true })}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
