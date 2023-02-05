import React from 'react';
import { FormInputProps } from '../../types/types';

const FormInput = ({
  name,
  type,
  label,
  required,
  register,
  rules,
  placeholder,
  ...props
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
        {...register(name, rules)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default FormInput;
