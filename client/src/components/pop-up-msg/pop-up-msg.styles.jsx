import styled, { keyframes } from "styled-components";

import {
  frostedGlass,
  globalOpacityTransition,
} from "../../global.styles";


const moveUpAnim = keyframes`
0% {
    bottom: 0;
}
100%{
    bottom: 5vh;
}
`;

export const MsgContainer = styled.div`
  padding: 1vw;
  position: absolute;
  right: 3vw;
  bottom: 5vh;
  ${frostedGlass}
  box-shadow: 0 0 0 0 #ffffff;
  animation: ${moveUpAnim} 0.6s 1 cubic-bezier(0.79, 0.12, 0.63, 0.24),
    ${globalOpacityTransition} 0.7s 1 cubic-bezier(0.79, 0.12, 0.63, 0.24);
  @media screen and (max-width: 800px) {
    position: sticky;
    left: 0;
    right: 0;
    padding: 5vw;
    bottom: 12vh;
  }
  @media screen and (max-width: 300px) {
  }
`;

export const Text = styled.p`
  text-align: center;
`;

export const CloseBtn = styled.span`
  cursor: pointer;
  svg {
    position: absolute;
    width: 25px;
    top: 1vh;
    right: 0.5vw;
  }
`;
CloseBtn.displayName = "CloseBtn";
