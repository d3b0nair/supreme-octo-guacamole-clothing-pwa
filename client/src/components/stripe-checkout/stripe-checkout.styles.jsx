import styled from "styled-components";

import CustomButton from "../custom-button/custom-button.component";

import { frostedGlass } from "../../global.styles";

export const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "rgb(64, 100, 145)",
      fontWeight: 700,
      fontFamily: "Open Sans Condensed, sans-serif",
      fontSize: "16px",
      color: "rgb(64, 100, 145)",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "black",
      },
    },
    invalid: {
      iconColor: "rgb(255, 87, 87)",
      color: "rgb(255, 87, 87)",
    },
    webkitAutofill: {
      color: "rgb(64, 100, 145)",
      backgroundColor: "white",
    },
  },
};

export const FormContainer = styled.form``;
FormContainer.displayName = "FormContainer";

export const FormGroupWrapper = styled.fieldset`
  margin: 0 0 15px;
  ${frostedGlass}
`;
export const FormRowContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  border-top: 1px solid rgb(64, 100, 145);
  margin: 5% 0;
  @media screen and (max-width: 800px) {
    margin: 6% 0;
  }
  &:first-child {
    border-top: none;
  }
`;

export const SubmitButtonWrapper = styled(CustomButton)`
  width: 100%;
  &:disabled {
    cursor: not-allowed;
  }
  @media screen and (max-width: 800px) {
    margin: 10px 0 10px 0;
  }
`;

export const CardElementWrapper = styled.div`
  width: 100%;
  padding: 10px 10px 10px 5px;
  background: white;
  box-shadow: inset 9.91px 9.91px 15px #d9dade,
    inset -9.91px -9.91px 15px #ffffff;
`;

export const FieldGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1em;
  div {
    margin-top: 0;
  }
  input {
    margin: 0;
  }
`;
