import styled from "styled-components";
import CustomButton from "../custom-button/custom-button.component";
import { frostedGlass } from "./../../global.styles";


export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
${frostedGlass}
  top: 90px;
  right: 40px;
  z-index: 5;
`;

export const CartItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ButtonWrapper = styled(CustomButton)`
  margin-top: auto;
`;

export const EmptyMsgWrapper = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;
