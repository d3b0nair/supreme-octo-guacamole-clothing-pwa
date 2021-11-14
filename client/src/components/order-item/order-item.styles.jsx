import styled, { css } from "styled-components";

import { frostedGlass } from "./../../global.styles";

const borderOutline = css`
  border: 1px solid rgba(255, 255, 255, 1);
`;
const padding = css`
  padding: 20px;
  @media screen and (max-width: 800px) {
    padding: 15px;
  }
`;

const lineHeight = css`
  line-height: 55%;
  @media screen and (max-width: 800px) {
    line-height: 100%;
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: auto;
  width: 700px;
  color: white;
  border-radius: 4px;
  min-width: 350px;
  ${frostedGlass}
  ${padding}
  ${borderOutline}

  @media screen and (max-width: 800px) {
    top: unset;
    transform: unset;
    left: unset;
    min-width: unset;
    width: 100%;
  }
`;

export const ItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". . . . .";
  min-height: 50px;
  align-items: center;
`;

export const Title = styled.h2`
  ${padding}
  text-align: center;
  font-size: 1.5em;
  ${lineHeight}
  @media screen and (max-width: 800px) {
    margin-top: 10%;
  }
`;
export const ItemText = styled.div`
  ${padding}
  text-align: center;
  font-size: 1.2em;
`;

export const TotalPrice = styled.h4`
  margin: 30px 0 0 auto;
  font-size: 2em;
  ${padding}
  ${lineHeight}
`;

export const ItemsPreview = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  border: 1px solid rgba(255, 255, 255, 1);
  ${frostedGlass}
  ${padding}
  img {
    width: 60px;
    margin: 5px;
    max-width: 100%;
    height: auto;
    border: 1px solid rgba(255, 255, 255, 1);
  }
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      width: 50px;
      margin: 3px;
    }
  }
`;
export const CustomerInfo = styled.div`
  justify-self: left;
  @media screen and (max-width: 800px) {
    justify-self: unset;
  }
`;

export const DeliveryInfo = styled.div`
  justify-self: right;
  @media screen and (max-width: 800px) {
    justify-self: unset;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: grid;
  border: 1px solid rgba(255, 255, 255, 1);
  ${frostedGlass}
  ${padding}
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoText = styled.p`
  font-size: 1.2em;
  ${lineHeight}
`;

export const OrderNumber = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: #1b2735;
  ${frostedGlass}
  background: white;
  padding: 5px;
  border-radius: 0 7px 0 10px;
`;

export const DateText = styled.p`
  text-align: center;
  color: #1b2735;
  ${padding}
  ${lineHeight}
`;
