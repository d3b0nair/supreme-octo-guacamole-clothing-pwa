import StripeActionTypes from "./stripe.types";
export const createPaymentIntentID = (id) => ({
  type: StripeActionTypes.CREATE_PAYMENT_INTENT_ID,
  payload: id,
});

export const createPaymentIntent_start = (cartItems) => ({
  type: StripeActionTypes.CREATE_PAYMENT_INTENT_START,
  payload: cartItems,
});

export const updatePaymentIntent_start = (cartItems) => ({
  type: StripeActionTypes.UPDATE_PAYMENT_INTENT_START,
  payload: cartItems,
});

export const cancelPaymentIntent_start = (payload) => ({
  type: StripeActionTypes.CANCEL_PAYMENT_INTENT_START,
  payload,
});

export const createPaymentIntent_success = () => ({
  type: StripeActionTypes.CREATE_PAYMENT_INTENT_SUCCESS,
});

export const updatePaymentIntent_success = () => ({
  type: StripeActionTypes.UPDATE_PAYMENT_INTENT_SUCCESS,
});

export const cancelPaymentIntent_success = () => ({
  type: StripeActionTypes.CANCEL_PAYMENT_INTENT_SUCCESS,
});

export const createPaymentIntent_failure = (error) => ({
  type: StripeActionTypes.CREATE_PAYMENT_INTENT_FAIL,
  payload: error,
});

export const updatePaymentIntent_failure = (error) => ({
  type: StripeActionTypes.UPDATE_PAYMENT_INTENT_FAIL,
  payload: error,
});

export const cancelPaymentIntent_failure = (error) => ({
  type: StripeActionTypes.CANCEL_PAYMENT_INTENT_FAIL,
  payload: error,
});

export const createClientSecret_start = () => ({
  type: StripeActionTypes.CREATE_CLIENT_SECRET_START,
});

export const cancelClientSecret_start = () => ({
  type: StripeActionTypes.CANCEL_CLIENT_SECRET_START,
});

export const createClientSecret_failure = (error) => ({
  type: StripeActionTypes.CREATE_CLIENT_SECRET_FAIL,
  payload: error,
});

export const createClientSecret_success = (id) => ({
  type: StripeActionTypes.CREATE_CLIENT_SECRET_SUCCESS,
  payload: id,
});

export const cancelClientSecret_failure = (error) => ({
  type: StripeActionTypes.CANCEL_CLIENT_SECRET_FAIL,
  payload: error,
});

export const cancelClientSecret_success = () => ({
  type: StripeActionTypes.CANCEL_CLIENT_SECRET_SUCCESS,
});
export const stripeReset = () => ({
  type: StripeActionTypes.STRIPE_RESET,
});
