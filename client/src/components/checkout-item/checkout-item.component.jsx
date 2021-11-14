import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";

import {
  CheckoutItemContainer,
  ImageContainer,
  ImgWrapper,
  CollumnWrapper,
  QuantityCollumn,
  ArrowSymbol,
  ItemValue,
  RemoveButton,
  RemoveButtonWrapper,
} from "./checkout-item.styles";

export function CheckoutItem({ cartItem, clearItem, addItem, removeItem }) {
  const smallScreen = window.innerWidth < 300;
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <ImgWrapper src={imageUrl} alt="item" />
      </ImageContainer>
      <CollumnWrapper>{name}</CollumnWrapper>
      <QuantityCollumn>
        <ArrowSymbol
          data-testid="remove-checkout-item"
          onClick={() => removeItem(cartItem)}
        >
          &#10094;
        </ArrowSymbol>
        <ItemValue>{quantity}</ItemValue>
        <ArrowSymbol
          data-testid="add-checkout-item"
          onClick={() => addItem(cartItem)}
        >
          &#10095;
        </ArrowSymbol>
      </QuantityCollumn>
      <CollumnWrapper>
        {smallScreen ? `Price: ${price}` : price}$
      </CollumnWrapper>
      <RemoveButtonWrapper>
        <RemoveButton
          data-testid="clear-checkout-item"
          onClick={() => clearItem(cartItem)}
        >
          {smallScreen ? (
            <CustomButton inverted>Remove Item</CustomButton>
          ) : (
            "✕"
          )}
        </RemoveButton>
      </RemoveButtonWrapper>
    </CheckoutItemContainer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
