import styled from "styled-components";

export const HomePageContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;
  @media screen and (max-width: 800px) {
    padding: 20px 20px;
  }
  @media screen and (max-width: 300px) {
    padding: 10px 10px;
  }
`;
