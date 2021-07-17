import React from "react";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";

import {
  CartIconWrapper,
  ShoppingIconWrapper,
  ItemCountWrapper,
} from "./cart-icon.styles";

function CartIcon({ toggleCartHidden, itemCount }) {
  return (
    <CartIconWrapper onClick={toggleCartHidden}>
      <ShoppingIconWrapper />
      <ItemCountWrapper>{itemCount}</ItemCountWrapper>
    </CartIconWrapper>
  );
}
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
