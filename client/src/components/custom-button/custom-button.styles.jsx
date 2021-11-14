import styled, { css } from "styled-components";

const buttonStyles = css`
  color: black;
  &:hover {
    background: rgba(63, 98, 142, 0.5);
    color: white;
    transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;

const invertedButtonStyles = css`
  color: white;
  background: rgba(63, 98, 142, 0.5);
  border-radius: unset;
  &:hover {
    background: #98bdeb;
    color: white;
    transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;

const googleSignInStyles = css`
  border: none;
  background-color: #4285f4;
  color: white;
  line-height: unset;
  &:hover {
    background-color: #357ae8;
    border: none;
  }
  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }
  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 135px;
  height: 50px;
  transition: all 100ms ease-in-out;
  will-change: transform;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 14px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  cursor: pointer;
  justify-content: center;
  background: #98bdeb;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  @media screen and (max-width: 800px) {
    min-width: unset;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 300px) {
    line-height: unset;
  }
  &:active {
    transform: scale(0.98);
  }
  ${getButtonStyles}
`;
