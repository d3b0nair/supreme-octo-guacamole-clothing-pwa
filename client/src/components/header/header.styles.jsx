import styled from "styled-components";
import { Link } from "react-router-dom";
import { global_padding_left_right } from "../../global.styles";

export const HeaderContainer = styled.header`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  @media screen and (max-width: 800px) {
    height: 50px;
    padding: 10px;
    justify-content: space-around;
  }
  @media screen and (max-width: 300px) {
    height: 50px;
    padding: 5px;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 55px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 100px;
  padding: 25px;
  @media screen and (max-width: 800px) {
    padding: 0;
    width: 50px;
  }
  &:hover {
    transform: scale(1.15);
    transition: transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 800px) {
    margin: 10px;
    width: 80%;
  }
  @media screen and (max-width: 300px) {
    width: 100%;
    justify-content: space-around;
  }
`;

export const CartDropdownContainer = styled.div`
  position: absolute;
  top: 90px;
  right: ${global_padding_left_right}px;
  z-index: 5;
  @media screen and (max-width: 300px) {
    top: 120px;
    right: 16px;
  }
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  &:hover {
    transform: scale(1.35);
    color: #ff6e7f;
    transition: transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;
OptionLink.displayName = "OptionLink";
