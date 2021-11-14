import React from "react";

import {
  FormContainer,
  FormInputContainer,
  FormInputLabel,
} from "./form-input.styles";

function FormInput({ handleChange, label, value, ...otherProps }) {
  return (
    <FormContainer>
      <FormInputContainer
        data-testid="FormInputContainer"
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        <FormInputLabel
          data-testid="FormInputLabel"
          className={`${value.length ? "shrink" : ""} form-input-label`}
        >
          {label}
        </FormInputLabel>
      ) : null}
    </FormContainer>
  );
}

export default FormInput;
