import StripeActionTypes from "./stripe.types";

const INITIAL_STATE = {
  paymentIntentId: null,
  clientSecret: null,
  paymentIntentError: null,
  clientSecretError: null,
};

const stripeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StripeActionTypes.CREATE_PAYMENT_INTENT_ID:
      return {
        ...state,
        paymentIntentId: action.payload,
        paymentIntentError: null,
      };
    case StripeActionTypes.CANCEL_PAYMENT_INTENT_SUCCESS:
      return { ...state, paymentIntentId: null, paymentIntentError: null };
    case StripeActionTypes.CREATE_CLIENT_SECRET_SUCCESS:
      return {
        ...state,
        clientSecret: action.payload,
        clientSecretError: null,
      };
    case StripeActionTypes.CANCEL_CLIENT_SECRET_SUCCESS:
      return { ...state, clientSecret: null, clientSecretError: null };
    case StripeActionTypes.CANCEL_PAYMENT_INTENT_FAIL:
    case StripeActionTypes.CREATE_PAYMENT_INTENT_FAIL:
    case StripeActionTypes.UPDATE_PAYMENT_INTENT_FAIL:
      return {
        ...state,
        paymentIntentError: action.payload,
      };
    case StripeActionTypes.CANCEL_CLIENT_SECRET_FAIL:
    case StripeActionTypes.UPDATE_CLIENT_SECRET_FAIL:
      return {
        ...state,
        clientSecretError: action.payload,
      };
    default:
      return state;
  }
};

export default stripeReducer;
