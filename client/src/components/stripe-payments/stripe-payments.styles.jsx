import styled from "styled-components";
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