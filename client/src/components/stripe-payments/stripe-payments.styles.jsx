import styled from "styled-components";

import CustomButton from "../custom-button/custom-button.component";

import { frostedGlass } from "./../../global.styles";


export const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#ffffff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      color: "#ffffff",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#ffffff",
      },
      "::placeholder": {
        color: "#1b2735",
      },
    },
    invalid: {
      iconColor: "rgb(255, 87, 87)",
      color: "rgb(255, 87, 87)",
    },
  },
};

export const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

export const ElementsContainer = styled.div`
  min-width: 350px;
  position: relative;
  @media screen and (max-width: 800px) {
    min-width: auto;
    position: relative;
  }
`;

export const FormContainer = styled.form``;

export const FormGroupWrapper = styled.fieldset`
  margin: 0 0 15px;
  ${frostedGlass}
`;
export const FormRowContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 15px;
  border-top: 1px solid rgb(64, 100, 145);
  &:first-child {
    border-top: none;
  }
`;


export const SubmitButtonWrapper = styled(CustomButton)`
  width: 100%;
  &:disabled {
    cursor: not-allowed;
  }
  @media screen and (max-width: 800px){
        margin: 10px 0 10px 0;
    }
`;

export const CardElementWrapper = styled.div`
  width: 100%;
  padding: 10px 0 10px 0;
  &:--webkit-autofill {
    background: #fffff !important;
  }
`;

export const CardErrorContainer = styled.span`
  &:hover {
    color: rgb(255, 87, 87);
  }
`;

export const FieldGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1em;
  div{
    margin-top: 0;
  }
  input{
    margin: 0;
  }
`;



