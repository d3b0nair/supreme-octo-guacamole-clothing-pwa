import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  CartItemsContainer,
  ButtonWrapper,
  EmptyMsgWrapper,
} from "./cart-dropdown.styles";

function CartDropdown({ cartItems, history, dispatch }) {
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
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
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
