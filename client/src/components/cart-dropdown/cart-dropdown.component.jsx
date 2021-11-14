import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import CartItem from "../cart-item/cart-item.component";
import * as handleClickHelper from "./cart-dropdown.component";

import {
  CartDropdownContainer,
  CartItemsContainer,
  ButtonWrapper,
  EmptyMsgWrapper,
} from "./cart-dropdown.styles";

export const handleClick = (history, dispatch) => {
  history.push("/checkout");
  dispatch(toggleCartHidden());
};
export function CartDropdown({ cartItems, history, dispatch }) {
  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMsgWrapper>Your cart is empty</EmptyMsgWrapper>
        )}
      </CartItemsContainer>
      <ButtonWrapper
        onClick={() => handleClickHelper.handleClick(history, dispatch)}
      >
        GO TO CHECKOUT
      </ButtonWrapper>
    </CartDropdownContainer>
  );
}
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
