import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import FormInput from "../form-input/form-input.component";
import PopUpMsg from "../pop-up-msg/pop-up-msg.component";
import {
  FormContainer,
  FormGroupWrapper,
  FormRowContainer,
  SubmitButtonWrapper,
  CardElementWrapper,
  FieldGridContainer,
  CARD_OPTIONS,
} from "./stripe-checkout.styles";

export function CheckoutForm({
  userId,
  cartItems,
  createOrder,
  updatePaymentIntent,
  checkoutStatus,
  total,
  paymentIntentId,
  clientSecret,
  cancelPaymentIntent,
}) {
  const [error, setError] = useState(null);
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

  useEffect(() => {
    return async () => {
      if (!stripe) {
        return;
      } else if (
        checkoutStatus !== "START" &&
        !clientSecret &&
        !paymentIntentId
      ) {
        const paymentIntentStatus = await stripe.retrievePaymentIntent(
          clientSecret
        );
        if (
          paymentIntentStatus.paymentIntent === paymentIntentId &&
          paymentIntentStatus.paymentIntent.status === "succeeded"
        ) {
          cancelPaymentIntent({ id: paymentIntentId });
        }
      }
    };
  }, [
    cancelPaymentIntent,
    checkoutStatus,
    clientSecret,
    paymentIntentId,
    stripe,
  ]);

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
    } else if (
      payload.paymentIntent &&
      payload.paymentIntent.status === "succeeded"
    ) {
      setError(null);
      createOrder(
        paymentIntentId,
        cartItems,
        { ...deliveryDetails, ...customerDetails },
        total,
        userId
      );
    }
  };

  const SubmitButton = ({ children, disabled }) => (
    <SubmitButtonWrapper type="submit" disabled={disabled}>
      {checkoutStatus === "PROCESSING"
        ? "Processing..."
        : checkoutStatus === "SUCCEDED"
        ? `Paid ${children}$`
        : `Pay ${children}$`}
    </SubmitButtonWrapper>
  );
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
  const paymentPopUpMsg = error ? (
    <PopUpMsg
      style={{
        position: "absolute",
        width: "100%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
      onDismiss={() => setError(false)}
      msg={error}
      action={() => window.location.reload()}
      actionText={"Reload checkout"}
    />
  ) : null;
  return (
    <>
      <FormContainer onSubmit={(ev) => handleSubmit(ev)}>
        {renderCustomerDetails}
        {renderDeliveryDetails}
        <FormGroupWrapper>
          <FormRowContainer>
            <CardElementWrapper>
              <CardElement options={CARD_OPTIONS} />
            </CardElementWrapper>
          </FormRowContainer>
        </FormGroupWrapper>
        <SubmitButton disabled={checkoutStatus === "SUCCEDED" ? true : false}>
          {total}
        </SubmitButton>
        {paymentPopUpMsg}
      </FormContainer>
    </>
  );
}

export default CheckoutForm;
