import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selector";
import {
  createPaymentIntent_start,
  updatePaymentIntent_start,
} from "../../redux/stripe/stripe.actions";
import { selectCheckoutStatus } from "../../redux/checkout/checkout.selectors";
import {
  selectStripePayimentIntentId,
  selectClientSecret,
} from "../../redux/stripe/stripe.selectors";
import {
  checkoutSucceded,
  createOrder_START,
} from "../../redux/checkout/checkout.actions";

import FormInput from "../form-input/form-input.component";


import {
  ElementsContainer,
  FormContainer,
  FormGroupWrapper,
  FormRowContainer,
  SubmitButtonWrapper,
  CardElementWrapper,
  CardErrorContainer,
  FieldGridContainer,
  CARD_OPTIONS,
  ELEMENTS_OPTIONS,
} from "./stripe-payments.styles";

function StripePayments({
  total,
  cartItems,
  checkoutStatus,
  checkoutSucceded,
  createPaymentIntent,
  updatePaymentIntent,
  paymentIntentId,
  clientSecret,
  createOrder,
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

  const CardField = ({ onChange }) => (
    <FormRowContainer>
      <CardElementWrapper>
        <CardElement options={CARD_OPTIONS} onChange={onChange} />
      </CardElementWrapper>
    </FormRowContainer>
  );


  const SubmitButton = ({ error, children, disabled }) => (
    <SubmitButtonWrapper type="submit" disabled={disabled}>
      {checkoutStatus === "PROCESSING" ? (
        "Processing..."
      ) : checkoutStatus === "SUCCEDED" ? (
        `Paid ${children}$`
      ) : error ? (
        <CardErrorContainer>{error}</CardErrorContainer>
      ) : (
        `Pay ${children}$`
      )}
    </SubmitButtonWrapper>
  );

  const CheckoutForm = () => {
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const [customerDetails, setCustomerDetails] = useState({
      email: "",
      phone: "",
      name: "",
    });
    const [deliveryDetails, setDeliveryDetails] = useState({
      street: "",
      city: "",
      state: "",
      zip: "",
    });

    const handleSubmit = async (ev) => {
      ev.preventDefault();
      await updatePaymentIntent({
        id: paymentIntentId,
        update: { receipt_email: customerDetails.email },
      });
      const payload = await stripe.confirmCardPayment(clientSecret, {
        receipt_email: customerDetails.email,
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
      } else {
        setError(null);
        setDisabled(false);
        createOrder(
          paymentIntentId,
          cartItems,
          { ...deliveryDetails, ...customerDetails },
          total
        );
        checkoutSucceded();
      }
    };

    const renderCustomerDetails = (
      <FormGroupWrapper>
        <FormInput
          label="Full Name"
          id="name"
          type="text"
          required
          autoComplete="name"
          value={customerDetails.name}
          onChange={(e) => {
            setCustomerDetails({ ...customerDetails, name: e.target.value });
          }}
        />
        <FormInput
          label="Email Address"
          id="email"
          type="email"
          required
          autoComplete="email"
          value={customerDetails.email}
          onChange={(e) => {
            setCustomerDetails({ ...customerDetails, email: e.target.value });
          }}
        />
        <FormInput
          label="Phone number"
          id="phone"
          type="tel"
          required
          autoComplete="tel"
          value={customerDetails.phone}
          onChange={(e) => {
            setCustomerDetails({ ...customerDetails, phone: e.target.value });
          }}
        />
      </FormGroupWrapper>
    );

    const renderDeliveryDetails = (
      <FormGroupWrapper>
        <FormInput
          label="Street Address"
          id="street"
          type="street"
          required
          autoComplete="street-address"
          value={deliveryDetails.street}
          onChange={(e) => {
            setDeliveryDetails({ ...deliveryDetails, street: e.target.value });
          }}
        />
        <FormInput
          label="City"
          id="city"
          type="city"
          required
          value={deliveryDetails.city}
          onChange={(e) => {
            setDeliveryDetails({ ...deliveryDetails, city: e.target.value });
          }}
        />
        <FieldGridContainer>
          <FormInput
            label="State"
            id="state"
            type="state"
            required
            value={deliveryDetails.state}
            onChange={(e) => {
              setDeliveryDetails({ ...deliveryDetails, state: e.target.value });
            }}
          />
          <FormInput
            label="Zip Code"
            id="zip"
            type="zip"
            required
            value={deliveryDetails.zip}
            onChange={(e) => {
              setDeliveryDetails({ ...deliveryDetails, zip: e.target.value });
            }}
          />
        </FieldGridContainer>
      </FormGroupWrapper>
    );

    return (
      <FormContainer onSubmit={handleSubmit}>
        {renderCustomerDetails}
        {renderDeliveryDetails}
        <FormGroupWrapper>
          <CardField
            onChange={async (event) => {
              setDisabled(event.empty);
              setError(event.error ? event.error.message : "");
            }}
          />
        </FormGroupWrapper>
        <SubmitButton
          disabled={disabled}
          succeeded={checkoutStatus === "SUCCEDED" ? true : false}
          error={error}
        >
          {total}
        </SubmitButton>
      </FormContainer>
    );
  };

  const stripePromise = loadStripe(
    "pk_test_51IQnEYB1K9Yo1Z8kLlGiGgGyaJwhHqvwWFnzi81Bs63AmfXmkMooVeAdrV7YiVwqjwa1Pqck5nzaAj5n6wf8wAFf00EYWjrM5p"
  );

  return (
    <ElementsContainer>
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm />
      </Elements>
    </ElementsContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  paymentIntentId: selectStripePayimentIntentId,
  clientSecret: selectClientSecret,
  cartItems: selectCartItems,
  total: selectCartTotal,
  checkoutStatus: selectCheckoutStatus,
});

const mapDispatchToProps = (dispatch) => ({
  checkoutSucceded: () => dispatch(checkoutSucceded()),
  createPaymentIntent: (cartItems) =>
    dispatch(createPaymentIntent_start(cartItems)),
  updatePaymentIntent: (payload) =>
    dispatch(updatePaymentIntent_start(payload)),
  createOrder: (id, items, customer, total) =>
    dispatch(createOrder_START(id, items, customer, total)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StripePayments);
