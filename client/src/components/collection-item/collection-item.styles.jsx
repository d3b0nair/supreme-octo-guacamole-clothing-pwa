import styled from "styled-components";

import CustomButton from "../custom-button/custom-button.component";

import { frostedGlass } from "./../../global.styles";

const getImageUrl = (props) => {
  return props.url;
};

export const CollectionItemContainer = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 22vw;
  align-items: center;
  position: relative;
  border-radius: 4px;
  padding: 10px;
  margin: 3px;
  ${frostedGlass}
  &:hover {
    .image {
      opacity: 0.8;
    }
    button {
      opacity: 0.85;
      display: flex;
    }
  }
  @media screen and (max-width: 888px) {
    width: 80vw;
    margin: 0 0 10px 0;
    ${"" /* flex-direction: column-reverse; */}
  }
  @media screen and (max-width: 300px) {
    &:hover {
      button {
        display: block;
      }
    }
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  opacity: 1;
  background-image: url(${getImageUrl});
  border-width: 1px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
`;
export const CollectionFooterContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  font-size: 150%;
`;

export const ItemName = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;
export const ItemPrice = styled.span`
  width: auto;
`;

export const AddToCartButton = styled(CustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 235px;
  display: none;
  @media screen and (max-width: 888px) {
    display: block;
    opacity: 1;
  }
`;
AddToCartButton.displayName = "AddToCartButton";
