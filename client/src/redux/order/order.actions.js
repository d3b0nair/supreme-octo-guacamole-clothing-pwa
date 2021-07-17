import OrderActionsTypes from "./order.types";

export const fetchOrderStart = (urlParam) => ({
  type: OrderActionsTypes.FETCH_ORDER_START,
  payload: urlParam,
});

export const fetchOrderSuccess = (order_data) => ({
  type: OrderActionsTypes.FETCH_ORDER_SUCCESS,
  payload: order_data,
});

export const fetchOrderFailure = (errorMessage) => ({
  type: OrderActionsTypes.FETCH_ORDER_FAILURE,
  payload: errorMessage,
});
