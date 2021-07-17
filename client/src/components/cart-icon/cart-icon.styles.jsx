import styled from "styled-components";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-cart.svg";

export const CartIconWrapper = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    width: 55px;
    height: 55px;
  }
  &:hover {
    transform: scale(1.25);
    color: #ff6e7f;
    transition: transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
  &:hover path {
    fill: #ff6e7f !important;
  }
`;
export const ShoppingIconWrapper = styled(ShoppingIcon)`
  width: 24px;
  height: 24px;
  @media screen and (max-width: 800px) {
    width: 35px;
    height: 35px;
  }
`;

export const ItemCountWrapper = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
  @media screen and (max-width: 800px) {
    font-size: 15px;

  }
`;
