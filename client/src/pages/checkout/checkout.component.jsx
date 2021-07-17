import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Spinner from "../../components/spinner/spinner.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selector";
import { selectCheckoutStatus } from "../../redux/checkout/checkout.selectors";
import { checkoutStart } from "../../redux/checkout/checkout.actions";

import {
  CheckoutPageContainer,
  TotalPrice,
  CartHeader,
  Cart,
  ProcessPayment,
  CartContainer,
} from "./checkout.styles.jsx";

const StripePayments = lazy(() =>
  import("../../components/stripe-payments/stripe-payments.component")
);

function CheckoutPage({ cartItems, total, checkoutStatus, checkoutStart }) {
  return (
    <CheckoutPageContainer>
      {checkoutStatus !== false ? (
        <h2>Supreme Octo Guacamole Cloting Ltd.</h2>
      ) : null}
      <CartContainer>
        <Cart>
          <CartHeader>
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
          </CartHeader>
          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}
        </Cart>
        {checkoutStatus !== false ? (
          <ProcessPayment>
            <Suspense fallback={<Spinner />}>
              <StripePayments />
            </Suspense>
          </ProcessPayment>
        ) : null}
      </CartContainer>
      {checkoutStatus === false ? (
        <>
          <TotalPrice>TOTAL: ${total}</TotalPrice>
          <CustomButton
            style={{ margin: "3vh 0 3vh 0" }}
            onClick={() => (cartItems.length > 0 ? checkoutStart() : null)}
          >
            Proceed with payment
          </CustomButton>
        </>
      ) : null}
    </CheckoutPageContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  checkoutStatus: selectCheckoutStatus,
});

const mapDispatchToProps = (dispatch) => ({
  checkoutStart: () => dispatch(checkoutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
