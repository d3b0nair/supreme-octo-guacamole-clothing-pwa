import React, { lazy, Suspense, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Spinner from "../../components/spinner/spinner.component";
import PopUpMsg from "../../components/pop-up-msg/pop-up-msg.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selector";
import { selectCheckoutStatus } from "../../redux/checkout/checkout.selectors";
import { checkoutStart } from "../../redux/checkout/checkout.actions";
import { selectCurrentUser } from "../../redux/user/user.selector";

import {
  CheckoutPageContainer,
  TotalPrice,
  CartHeader,
  Cart,
  StripeContainer,
  CartContainer,
} from "./checkout.styles.jsx";

import history from "../../history";

const StripePayments = lazy(() =>
  import("../../components/stripe-payments/stripe-payments.component")
);

export function CheckoutPage({
  cartItems,
  total,
  checkoutStatus,
  checkoutStart,
  currentUser,
}) {
  const [showMsg, setShowMsg] = useState(false);
  const proceedToCheckout = () =>
    currentUser
      ? cartItems.length > 0
        ? checkoutStart()
        : null
      : setShowMsg(true);
  const StoreName = () => <h2>Supreme Octo Guacamole Cloting Ltd.</h2>;
  const CartRows = () => (
    <>
      <div>
        <span>Product</span>
      </div>
      <div>
        <span>Description</span>
      </div>
      <div>
        <span>Quantity</span>
      </div>
      <div>
        <span>Price</span>
      </div>
      <div>
        <span>Remove</span>
      </div>
    </>
  );
  const renderStoreName = checkoutStatus !== false ? <StoreName /> : null;
  const renderCartItems = cartItems.map((cartItem) => (
    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
  ));
  const renderCheckoutWithStripe =
    checkoutStatus !== false ? (
      <StripeContainer>
        <Suspense fallback={<Spinner />}>
          <StripePayments />
        </Suspense>
      </StripeContainer>
    ) : null;
  const renderButtonToPromtCheckoutWithStripe =
    checkoutStatus === false ? (
      <>
        <TotalPrice>TOTAL: ${total}</TotalPrice>
        <CustomButton
          style={{ margin: "3vh 0 3vh 0" }}
          onClick={() => proceedToCheckout()}
        >
          Proceed with payment
        </CustomButton>
      </>
    ) : null;
  const renderPopUpMsg = showMsg ? (
    <PopUpMsg
      onDismiss={() => setShowMsg(false)}
      msg={"Please log in or create an account to checkout."}
      action={() => history.push("/signin")}
      actionText={"Do it"}
    />
  ) : null;

  return (
    <CheckoutPageContainer>
      {renderStoreName}
      <CartContainer>
        <Cart>
          <CartHeader>
            <CartRows />
          </CartHeader>
          {renderCartItems}
        </Cart>
        {renderCheckoutWithStripe}
      </CartContainer>
      {renderButtonToPromtCheckoutWithStripe}
      {renderPopUpMsg}
    </CheckoutPageContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  checkoutStatus: selectCheckoutStatus,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkoutStart: () => dispatch(checkoutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
