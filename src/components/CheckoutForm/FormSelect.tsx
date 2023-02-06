import React from 'react';
import { FormSelectProps } from '../../types/types';

const FormSelect = ({
  label,
  name,
  register,
  value,
  onChange,
  options,
}: FormSelectProps) => {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, { required: true })}
        value={value}
        name={name}
        id={name}
        className="input select"
        onChange={({ target }) => onChange(target.value)}
      >
        {options.map((option: any) => (
          <option className="option" key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
