import React from "react";
import { connect } from "react-redux";

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

function CheckoutItem({ cartItem, clearItem, addItem, removeItem }) {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <ImgWrapper src={imageUrl} alt="item" />
      </ImageContainer>
      <CollumnWrapper>{name}</CollumnWrapper>
      <QuantityCollumn>
        <ArrowSymbol onClick={() => removeItem(cartItem)}>&#10094;</ArrowSymbol>
        <ItemValue>{quantity}</ItemValue>
        <ArrowSymbol onClick={() => addItem(cartItem)}>&#10095;</ArrowSymbol>
      </QuantityCollumn>
      <CollumnWrapper>{price}</CollumnWrapper>
      <RemoveButtonWrapper>
        <RemoveButton onClick={() => clearItem(cartItem)}>
          &#10005;
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
