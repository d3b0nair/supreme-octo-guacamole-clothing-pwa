const StripeActionTypes = {
  CREATE_PAYMENT_INTENT_ID: "CREATE_PAYMENT_INTENT_ID",
  CREATE_PAYMENT_INTENT_START: "CREATE_PAYMENT_INTENT_START",
  CREATE_PAYMENT_INTENT_SUCCESS: "CREATE_PAYMENT_INTENT_SUCCESS",
  CREATE_PAYMENT_INTENT_FAIL: "CREATE_PAYMENT_INTENT_FAIL",
  UPDATE_PAYMENT_INTENT_START: "UPDATE_PAYMENT_INTENT_START",
  UPDATE_PAYMENT_INTENT_SUCCESS: "UPDATE_PAYMENT_INTENT_SUCCESS",
  UPDATE_PAYMENT_INTENT_FAIL: "UPDATE_PAYMENT_INTENT_FAIL",
  CANCEL_PAYMENT_INTENT_START: "CANCEL_PAYMENT_INTENT_START",
  CANCEL_PAYMENT_INTENT_SUCCESS: "CANCEL_PAYMENT_INTENT_SUCCESS",
  CANCEL_PAYMENT_INTENT_FAIL: "CANCEL_PAYMENT_INTENT_FAIL",
  CANCEL_PAYMENT_INTENT: "CANCEL_PAYMENT_INTENT",
  CREATE_CLIENT_SECRET_START: "CREATE_CLIENT_SECRET_START",
  CANCEL_CLIENT_SECRET_START: "CANCEL_CLIENT_SECRET_START",
  CREATE_CLIENT_SECRET_SUCCESS: "CREATE_CLIENT_SECRET_SUCCESS",
  CANCEL_CLIENT_SECRET_FAIL: "CANCEL_CLIENT_SECRET_FAIL",
  CREATE_CLIENT_SECRET_FAIL: "CREATE_CLIENT_SECRET_FAIL",
  CANCEL_CLIENT_SECRET_SUCCESS: "CANCEL_CLIENT_SECRET_SUCCESS",
  STRIPE_RESET: "STRIPE_RESET",
};

export default StripeActionTypes;
