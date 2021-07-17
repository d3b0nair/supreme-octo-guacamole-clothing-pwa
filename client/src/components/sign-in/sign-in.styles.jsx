import styled from "styled-components";

export const SignInContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    width: 100%;
    margin: auto;
  }
`;

export const TitleContainer = styled.h2`
  margin: 10px 0;
`;

export const ButtonsBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 10px;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`;
