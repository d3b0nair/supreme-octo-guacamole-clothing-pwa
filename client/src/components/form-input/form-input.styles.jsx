import styled, { css } from "styled-components";

const subColor = "black";
const mainColor = "white";

const shrinkLabelStyles = css`
  top: -1.5em;
  left: 0;
  font-size: 1.4em;
  color: ${mainColor};
  @media screen and (max-width: 300px) {
    font-size: 1.2em;
  }
`;


export const FormContainer = styled.div`
  position: relative;
  margin: 11% 0;
  @media screen and (max-width: 800px) {
    margin: 13% 0;
  }
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  box-shadow: inset 9.91px 9.91px 15px #d9dade,
    inset -9.91px -9.91px 15px #ffffff;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;
  &:focus {
    outline: none;
  }
  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`;
FormInputContainer.displayName = "FormInputContainer";

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabelStyles}
  }
`;
FormInputLabel.displayName = "FormInputLabel";
