import { createGlobalStyle, css, keyframes } from "styled-components";

export const global_padding_top_bottom = 5;
export const global_padding_left_right = 35;
export const global_padding_media = 15;

export const globalPulseAnimation = keyframes`
  100% {
    box-shadow: 0 0 0 15px rgba(232, 76, 61, 0);
  }

  `;
export const globalOpacityTransition = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  `;

export const padding = css`
  padding: ${global_padding_top_bottom}px ${global_padding_left_right}px;
  @media screen and (max-width: 800px) {
    padding: ${global_padding_media}px;
  }
`;

export const frostedGlass = css`
  background: rgba(63, 98, 142, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export const customScrollBar = css`
  overflow: auto;
  scrollbar-width: none;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: none;
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    ${frostedGlass}
    background-color: #ffffff;
  }
`;

export const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
}

html{
  scroll-behavior: smooth;
  background-color: #77a1d3;
}

body {
    font-family: 'Open Sans Condensed', sans-serif;
    margin: 0;
    color: white;
    font-weight: 700;
    ${padding}
    ${customScrollBar}
    @media screen and (max-width: 800px) {
      margin-bottom: 10vh;
  }
}

body:before {
  content: "";
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background: #77a1d3; /* fallback for old browsers */
  background: linear-gradient(to right, #77a1d3, #79cbca, #e684ae);
  background: url("/images/background.webp") no-repeat center center;
  background-size: cover;
}

a {
    text-decoration: none;
}
`;
