import orderReducer, { INITIAL_STATE } from "./order.reducer";
import OrderActionTypes from "./order.types";

describe("cartReducer", () => {
  it("should return initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  it("FETCH_ORDER_START should create trigger isLoading", () => {
    const reducer = orderReducer(INITIAL_STATE, {
      type: OrderActionTypes.FETCH_ORDER_START,
    });
    expect(reducer.isLoading).toBe(true);
  });
  it("FETCH_ORDER_SUCCESS should trigger isLoading and send payload with order", () => {
    const payload = [{ id: 1 }, { id: 2 }];
    const prevState = { ...INITIAL_STATE, isLoading: true };
    const reducer = orderReducer(prevState, {
      type: OrderActionTypes.FETCH_ORDER_SUCCESS,
      payload,
    });
    expect(reducer.order).toBe(payload);
    expect(reducer.isLoading).toBe(false);
  });
  it("FETCH_ORDER_FAILURE should create switch isLoading to false and send payload with error msg", () => {
    const payload = "error";
    const prevState = { ...INITIAL_STATE, isLoading: true };
    const reducer = orderReducer(prevState, {
      type: OrderActionTypes.FETCH_ORDER_FAILURE,
      payload,
    });
    expect(reducer.errorMessage).toBe(payload);
    expect(reducer.isLoading).toBe(false);
  });
});
