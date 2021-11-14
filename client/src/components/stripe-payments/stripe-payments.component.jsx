import React, { useEffect } from "react";
import CheckoutForm from "../stripe-checkout/stripe-checkout.component";
import { Elements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartTotal } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { selectClientSecret } from "../../redux/stripe/stripe.selectors";
import { createOrder_START } from "../../redux/checkout/checkout.actions";
import { selectCartItems } from "../../redux/cart/cart.selector";
import {
  createPaymentIntent_start,
  updatePaymentIntent_start,
  cancelPaymentIntent_start,
} from "../../redux/stripe/stripe.actions";
import { selectCheckoutStatus } from "../../redux/checkout/checkout.selectors";
import { selectStripePayimentIntentId } from "../../redux/stripe/stripe.selectors";
import { ElementsContainer, ELEMENTS_OPTIONS } from "./stripe-payments.styles";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IQnEYB1K9Yo1Z8kLlGiGgGyaJwhHqvwWFnzi81Bs63AmfXmkMooVeAdrV7YiVwqjwa1Pqck5nzaAj5n6wf8wAFf00EYWjrM5p"
);

export function StripePayments({
  cartItems,
  checkoutStatus,
  createPaymentIntent,
  updatePaymentIntent,
  paymentIntentId,
  total,
  userId,
  clientSecret,
  createOrder,
  cancelPaymentIntent,
}) {
  useEffect(() => {
    if (paymentIntentId === null && checkoutStatus === "START") {
      createPaymentIntent({ cartItems });
    } else if (paymentIntentId && checkoutStatus === "START") {
      updatePaymentIntent({
        id: paymentIntentId,
        update: { items: cartItems },
      });
    }
  }, [
    checkoutStatus,
    cartItems,
    createPaymentIntent,
    paymentIntentId,
    updatePaymentIntent,
  ]);

  return (
    <ElementsContainer>
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm
          total={total}
          updatePaymentIntent={updatePaymentIntent}
          cartItems={cartItems}
          checkoutStatus={checkoutStatus}
          paymentIntentId={paymentIntentId}
          clientSecret={clientSecret}
          userId={userId}
          createOrder={createOrder}
          cancelPaymentIntent={cancelPaymentIntent}
        />
      </Elements>
    </ElementsContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  paymentIntentId: selectStripePayimentIntentId,
  cartItems: selectCartItems,
  total: selectCartTotal,
  checkoutStatus: selectCheckoutStatus,
  clientSecret: selectClientSecret,
  userId: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  createPaymentIntent: (cartItems) =>
    dispatch(createPaymentIntent_start(cartItems)),
  updatePaymentIntent: (payload) =>
    dispatch(updatePaymentIntent_start(payload)),
  createOrder: (id, items, customer, total, userId) =>
    dispatch(createOrder_START(id, items, customer, total, userId)),
  cancelPaymentIntent: (payload) =>
    dispatch(cancelPaymentIntent_start(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StripePayments);
