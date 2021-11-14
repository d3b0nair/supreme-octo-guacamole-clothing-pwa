import OrderActionsTypes from "./order.types";

export const INITIAL_STATE = {
  order: null,
  isLoading: false,
  errorMessage: undefined,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionsTypes.FETCH_ORDER_START:
      return { ...state, isLoading: true };
    case OrderActionsTypes.FETCH_ORDER_SUCCESS:
      return { ...state, order: action.payload, isLoading: false };
    case OrderActionsTypes.FETCH_ORDER_FAILURE:
      return { ...state, isLoading: false, errorMessage: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
