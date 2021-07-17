import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  @media screen and (max-width: 800px){
        height: 50px;
        padding: 10px;
    }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 100px;
  padding: 25px;
  @media screen and (max-width: 800px){
        padding: 0;
        width: 50px;
    }
  &:hover {
    transform: scale(1.15);;
    transition: transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 800px){
        margin: 10px;
        width: 80%;
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