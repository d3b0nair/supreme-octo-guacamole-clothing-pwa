import styled, { css } from "styled-components";

const scaleUpOnActive = css`
  &:active {
    transform: scale(1.65);
    transition: transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
`;
const noTextSelectionColor = css`
  &::selection {
    opacity: 0;
  }
`;

const onHover = css`
  &:hover {
    color: #ff6e7f;
  }
`;

const buttonStyle = css`
  cursor: pointer;
  ${scaleUpOnActive}
  ${noTextSelectionColor}
  ${onHover}
`;

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". . . . .";
  min-height: 100px;
  border-bottom: 1px solid white;
  font-size: 20px;
  align-items: center;
  @media screen and (max-width: 300px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ImageContainer = styled.div`
  padding: 5px;
  @media screen and (max-width: 800px) {
    width: auto;
  }
`;

export const ImgWrapper = styled.img`
  max-width: 100%;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 1);
`;
export const CollumnWrapper = styled.span`
  text-align: center;
  display: block;
  font-weight: normal;
`;
export const QuantityCollumn = styled.span`
  display: flex;
  justify-content: center;
`;
export const ArrowSymbol = styled.div`
  ${buttonStyle}
`;
export const ItemValue = styled.div`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  ${buttonStyle}
`;
export const RemoveButtonWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;
