import styled, { css } from "styled-components";

import { frostedGlass } from "./../../global.styles";

const RowSize = css`
  width: 100%;
  min-width: 320px;
  @media screen and (max-width: 800px) {
    min-width: auto;
  }
`;

export const container_media_margin = 10;
export const container_top_bottom_margin = 30;

export const CheckoutPageContainer = styled.div`
  width: 700px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: ${container_top_bottom_margin}px auto;
  h2 {
    text-align: center;
  }
  @media screen and (max-width: 800px) {
    margin: ${container_media_margin}px;
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
  @media screen and (max-width: 300px) {
    display: none;
  }
`;

export const TotalPrice = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
  @media screen and (max-width: 800px) {
    font-size: 30px;
    margin-top: 20px;
    margin-right: auto;
  }
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
export const StripeContainer = styled.div`
  margin: 0 25px 0 25px;

  @media screen and (max-width: 800px) {
    margin: 20px auto;
  }
  ${RowSize}
`;
