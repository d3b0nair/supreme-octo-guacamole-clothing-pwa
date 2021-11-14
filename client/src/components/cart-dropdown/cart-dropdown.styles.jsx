import styled from "styled-components";
import CustomButton from "../custom-button/custom-button.component";
import { frostedGlass, customScrollBar } from "./../../global.styles";

export const CartDropdownContainer = styled.div`
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${frostedGlass}
`;

export const CartItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  ${customScrollBar}
`;

export const ButtonWrapper = styled(CustomButton)`
  margin-top: auto;
`;
ButtonWrapper.displayName = "ButtonWrapper";

export const EmptyMsgWrapper = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;
