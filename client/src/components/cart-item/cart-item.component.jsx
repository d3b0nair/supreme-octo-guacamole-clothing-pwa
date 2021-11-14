import React from "react";

import {
  CartItemContainer,
  CartItemImg,
  ItemDetailsContainer,
} from "./cart-item.styles";

export function CartItem({ item: { imageUrl, price, name, quantity } }) {
  return (
    <CartItemContainer>
      <CartItemImg src={`${window.location.origin}/${imageUrl}`} alt={name} />
      <ItemDetailsContainer>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetailsContainer>
    </CartItemContainer>
  );
}
export default React.memo(CartItem);
