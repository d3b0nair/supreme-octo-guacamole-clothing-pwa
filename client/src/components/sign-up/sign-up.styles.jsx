import styled, { css } from "styled-components";
import { ReactComponent as VisibleIcon } from "../../assets/visible.svg";
import { ReactComponent as HideIcon } from "../../assets/hidden.svg";
export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  @media screen and (max-width: 800px) {
    width: 100%;
    margin: 0 0 40px 0;
  }
`;

const iconCSS = css`
  position: absolute;
  right: 0.5em;
  top: 0em;
  cursor: pointer;
  fill: rgba(63, 98, 142, 0.5);
  &:hover {
    fill: #ff6e7f;
    transition: fill 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;
export const VisibleIconWrapper = styled(VisibleIcon)`
  ${iconCSS}
`;
export const HideIconWrapper = styled(HideIcon)`
  ${iconCSS}
`;
export const Wrapper = styled.div`
  position: relative;
`;
export const TitleContainer = styled.h2`
  margin: 10px 0;
`;
export const TextContainer = styled.div`
  background-color: #ff6e7f;
  width: 100%;
  padding: 5px 0;
  margin-top: -13%;
  margin-bottom: 15px;
  @media screen and (max-width: 320px) {
    margin-top: -14%;
  }
`;
const textSize = 16;
export const TextMsg = styled.span`
  display: block;
  font-size: ${textSize}px;
  @keyframes fadeIn {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: inline-block;
      opacity: 0;
    }

    100% {
      display: inline-block;
      opacity: 1;
    }
  }
  animation: fadeIn 1s ease-out;
`;
