import styled from "styled-components";

export const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CollectionPageTitle = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
`;

export const CollectionPageItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (max-width: 888px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .collection-item {
    margin-bottom: 30px;
  }
`;
