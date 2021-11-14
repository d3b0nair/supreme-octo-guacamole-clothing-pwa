import styled, { keyframes } from "styled-components";

import {
  frostedGlass,
  globalOpacityTransition,
  globalPulseAnimation,
} from "../../global.styles";

const moveUpAnim = keyframes`
0%{
  top: 100%
}
100%{
  top: 90%
}
`;

export const ScrollUpButtonContainer = styled.div`
  svg {
    width: 50px;
    height: 50px;
  }
  animation: ${moveUpAnim} 0.8s 1 cubic-bezier(0.79, 0.12, 0.63, 0.24),
    ${globalPulseAnimation} 1s 1 cubic-bezier(0.79, 0.12, 0.63, 0.24),
    ${globalOpacityTransition} 0.8s 1 cubic-bezier(0.79, 0.12, 0.63, 0.24);
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
ScrollUpButtonContainer.displayName = "ScrollUpButtonContainer";
