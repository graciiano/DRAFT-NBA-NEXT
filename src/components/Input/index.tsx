import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { ErrorMessage, InputStyled, InputWrapper, Label, SelectStyled, TextAreaStyled } from './styles';

interface BaseInputProps {
  label?: string;
  error?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputStyled $hasError={!!error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, ...props }) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <TextAreaStyled $hasError={!!error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, BaseInputProps {
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, error, options, ...props }) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <SelectStyled $hasError={!!error} {...props}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectStyled>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
