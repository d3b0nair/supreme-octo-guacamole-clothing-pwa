import styled, { css } from "styled-components";

import { frostedGlass } from "./../../global.styles";

const RowSize = css`
  width: 100%;
  min-width: 320px;
  @media screen and (max-width: 800px) {
    min-width: auto;
  }
`;

export const CheckoutPageContainer = styled.div`
  width: 700px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 30px auto;
  h2 {
    text-align: center;
  }
  @media screen and (max-width: 800px) {
    margin: 10px;
    width: auto;
  }
`;
export const CartHeader = styled.div`
  padding: 0 0 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". . . . .";
  border-bottom: 1px solid #ffffff;
  text-align: center;
  div {
    text-transform: capitalize;
  }
`;

export const TotalPrice = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
  width: 100%;
  min-width: 700px;
  @media screen and (max-width: 800px) {
    min-width: 85px;
    flex-direction: column;
  }
`;
export const Cart = styled.div`
  ${frostedGlass}
  padding: 10px;

  ${RowSize}
`;
export const ProcessPayment = styled.div`
  margin: 0 25px 0 25px;

  @media screen and (max-width: 800px) {
    margin: 20px auto;
  }
  ${RowSize}
`;
