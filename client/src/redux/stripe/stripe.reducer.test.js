import stripeReducer, { INITIAL_STATE } from "./stripe.reducer";
import StripeActionTypes from "./stripe.types";

describe("stripeReducer", () => {
  it("should return initial state", () => {
    expect(stripeReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  it("CREATE_PAYMENT_INTENT_ID should create paymentIntentId with payload and reset paymentIntentError", () => {
    const payload = { id: 1 };
    const prevState = { ...INITIAL_STATE, paymentIntentError: "error" };
    const reducer = stripeReducer(prevState, {
      type: StripeActionTypes.CREATE_PAYMENT_INTENT_ID,
      payload,
    });
    expect(reducer.paymentIntentId).toBe(payload);
    expect(reducer.paymentIntentError).toBe(null);
  });
  it("CANCEL_PAYMENT_INTENT_SUCCESS should reset paymentIntentId and paymentIntentError", () => {
    const prevState = {
      ...INITIAL_STATE,
      paymentIntentId: { id: 1 },
      paymentIntentError: "error",
    };
    const reducer = stripeReducer(prevState, {
      type: StripeActionTypes.CANCEL_PAYMENT_INTENT_SUCCESS,
    });
    expect(reducer.paymentIntentId).toBe(null);
    expect(reducer.paymentIntentError).toBe(null);
  });
  it("CANCEL_PAYMENT_INTENT_SUCCESS should reset paymentIntentId with payload and reset clientSecretError", () => {
    const payload = { id: null };
    const prevState = { ...INITIAL_STATE, clientSecret: { id: 1 } };
    const reducer = stripeReducer(prevState, {
      type: StripeActionTypes.CREATE_CLIENT_SECRET_SUCCESS,
      payload,
    });
    expect(reducer.clientSecret).toBe(payload);
    expect(reducer.clientSecretError).toBe(null);
  });
  it("CANCEL_CLIENT_SECRET_SUCCESS should reset clientSecret and clientSecretError", () => {
    const prevState = {
      ...INITIAL_STATE,
      clientSecret: { id: 1 },
      clientSecretError: "error",
    };
    const reducer = stripeReducer(prevState, {
      type: StripeActionTypes.CANCEL_CLIENT_SECRET_SUCCESS,
    });
    expect(reducer.clientSecret).toBe(null);
    expect(reducer.clientSecretError).toBe(null);
  });
  it("CANCEL_PAYMENT_INTENT_FAIL should reset paymentIntentId with payload and reset clientSecretError", () => {
    const payload = { id: null };
    const prevState = { ...INITIAL_STATE, paymentIntentError: null };
    const reducer = stripeReducer(prevState, {
      type: StripeActionTypes.CREATE_CLIENT_SECRET_SUCCESS,
      payload,
    });
    expect(reducer.clientSecret).toBe(payload);
    expect(reducer.clientSecretError).toBe(null);
  });
  it("CREATE_CLIENT_SECRET_FAIL send payload with error msg to clientSecretError", () => {
    const payload = "error msg";
    const reducer = stripeReducer(INITIAL_STATE, {
      type: StripeActionTypes.CREATE_CLIENT_SECRET_FAIL,
      payload,
    });
    expect(reducer.clientSecretError).toBe(payload);
  });
  it("CREATE_CLIENT_SECRET_SUCCESS should reset clientSecretError and send payload to clientSecret", () => {
    const payload = { id: 1 };
    const prevState = { ...INITIAL_STATE, paymentIntentError: null };
    const reducer = stripeReducer(prevState, {
      type: StripeActionTypes.CREATE_CLIENT_SECRET_SUCCESS,
      payload,
    });
    expect(reducer.clientSecret).toBe(payload);
    expect(reducer.clientSecretError).toBe(null);
  });
  it("CANCEL_CLIENT_SECRET_FAIL should send payload with error msg to clientSecretError", () => {
    const payload = "error msg";
    const reducer = stripeReducer(INITIAL_STATE, {
      type: StripeActionTypes.CANCEL_CLIENT_SECRET_FAIL,
      payload,
    });
    expect(reducer.clientSecretError).toBe(payload);
  });
  it("STRIPE_RESET should reset paymentIntentId, clientSecret, paymentIntentError and clientSecretError", () => {
    const prevState = {
      ...INITIAL_STATE,
      paymentIntentId: 1,
      clientSecret: 2,
      paymentIntentError: 3,
      clientSecretError: 4,
    };
    const reducer = stripeReducer(prevState, {
      type: StripeActionTypes.STRIPE_RESET,
    });
    expect(reducer.paymentIntentId).toBe(null);
    expect(reducer.clientSecret).toBe(null);
    expect(reducer.paymentIntentError).toBe(null);
    expect(reducer.clientSecretError).toBe(null);
  });
});
