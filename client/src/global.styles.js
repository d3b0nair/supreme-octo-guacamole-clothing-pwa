import { createGlobalStyle, css } from "styled-components";

export const padding = css`
  padding: 5px 35px;
  @media screen and (max-width: 800px) {
    padding: 15px;
  }
`;

export const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
}

html{
  scroll-behavior: smooth;
}

body {
${
  "" /* background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%); */
}
    font-family: 'Open Sans Condensed', sans-serif;
    margin: 0;
    color: white;
    font-weight: bold;
    ${padding}
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
  background: url("/images/background.webp") no-repeat center center;
  background-size: cover;
}

a {
    text-decoration: none;
}
`;

export const frostedGlass = css`
  background: rgba(63, 98, 142, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
