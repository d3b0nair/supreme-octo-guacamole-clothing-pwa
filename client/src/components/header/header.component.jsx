import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { signOutStart } from "../../redux/user/user.actions";

import CartIcon from "../cart-icon/cart-icon.component";
import ScrollUpButton from "../scroll-up-button/scroll-up-button.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

function Header({ currentUser, hidden, signOutStart }) {
  const [scrollDown, setScrollDown] = useState(false);
  const listenScrollEvent = () => {
    window.scrollY > 500 ? setScrollDown(true) : setScrollDown(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  });
  return (
    <>
      <HeaderContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
          <OptionLink to="/shop">SHOP</OptionLink>
          <OptionLink to="/shop">CONTACT</OptionLink>
          {currentUser ? (
            <OptionLink as="div" onClick={signOutStart}>
              SIGN OUT
            </OptionLink>
          ) : (
            <OptionLink to="/signin">SIGN IN</OptionLink>
          )}
          <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
      </HeaderContainer>
      {scrollDown ? <ScrollUpButton /> : null}
    </>
  );
}
const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Header);
