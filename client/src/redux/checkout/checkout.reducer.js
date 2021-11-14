import { CheckoutActionTypes } from "./checkout.types";

export const INITIAL_STATE = {
  checkout_status: false,
  checkout_error: null,
};

const checkoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.CHECKOUT_PROCESSING:
      return { ...state, checkout_status: "PROCESSING" };
    case CheckoutActionTypes.CHECKOUT_START:
      return { ...state, checkout_status: "START" };
    case CheckoutActionTypes.CHECKOUT_SUCCEDED:
      return { ...state, checkout_status: "SUCCEDED" };
    case CheckoutActionTypes.CHECKOUT_RESET:
      return { ...state, checkout_status: false };
    case CheckoutActionTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        checkout_error: action.payload,
      };
    case CheckoutActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        checkout_error: null,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
