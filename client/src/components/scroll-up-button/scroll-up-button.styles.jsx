import styled from "styled-components";

import { frostedGlass } from "../../global.styles";

export const ScrollUpButtonContainer = styled.div`
  @keyframes pulse {
    100% {
      box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
    }
  }
  @keyframes opacityTransition {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  svg {
    width: 50px;
    height: 50px;
  }
  animation: pulse 1s 0.8s 3 cubic-bezier(0.79, 0.12, 0.63, 0.24),
  opacityTransition 1s 1 ease-in-out;
  position: fixed;
  right: 20px;
  top: 90%;
  z-index: 1000;
  width: 50px;
  height: 50px;
  cursor: pointer;
  ${frostedGlass}
  box-shadow: 0 0 0 0 #ffffff;
  @media screen and (max-width: 800px) {
    left: 50%;
    right: unset;
    transform: translateX(-50%);
  }
`;
