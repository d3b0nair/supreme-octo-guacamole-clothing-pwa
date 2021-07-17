import { CheckoutActionTypes } from "./checkout.types";

export const checkoutStart = () => ({
  type: CheckoutActionTypes.CHECKOUT_START,
});

export const processCheckout = () => ({
  type: CheckoutActionTypes.CHECKOUT_PROCESSING,
});

export const checkoutSucceded = () => ({
  type: CheckoutActionTypes.CHECKOUT_SUCCEDED,
});

export const checkoutReset = () => ({
  type: CheckoutActionTypes.CHECKOUT_RESET,
});

export const createOrder_START = (id, items, customer, total) => ({
  type: CheckoutActionTypes.CREATE_ORDER_START,
  payload: { id, items, customer, total },
});
export const createOrder_FAIL = () => ({
  type: CheckoutActionTypes.CREATE_ORDER_FAIL,
});
export const createOrder_SUCCESS = () => ({
  type: CheckoutActionTypes.CREATE_ORDER_SUCCESS,
});
