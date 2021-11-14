import styled from "styled-components";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-cart.svg";
const animationSpeed = `cubic-bezier(0.25, 0.45, 0.45, 0.95)`;
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
  @media screen and (max-width: 300px) {
    width: 55px;
    height: 55px;
  }
  &:hover {
    transform: scale(1.25);
    color: #ff6e7f;
    transition: transform 0.6s ${animationSpeed};
  }
  &:hover path {
    fill: #ff6e7f !important;
    transition: fill 0.3s ${animationSpeed};
  }
  &:hover span {
    color: white;
    transition: color 0.6s ${animationSpeed};
  }
`;
CartIconWrapper.displayName = "CartIconWrapper";
export const ShoppingIconWrapper = styled(ShoppingIcon)`
  width: 46px;
  height: 46px;
`;

export const ItemCountWrapper = styled.span`
  color: #77a1d3;
  position: absolute;
  font-size: 15px;
  font-weight: bold;
  bottom: 8px;
  @media screen and (max-width: 800px) {
    bottom: 14px;
  }
`;
