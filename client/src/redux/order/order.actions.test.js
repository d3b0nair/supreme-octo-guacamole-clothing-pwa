import OrderActionTypes from "./order.types";
import {
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFailure,
} from "./order.actions";

describe("fetchOrderStart action", () => {
  it("should create the fetchOrderStart action", () => {
    const action = fetchOrderStart();
    expect(action.type).toEqual(OrderActionTypes.FETCH_ORDER_START);
  });
});

describe("fetchOrderSuccess action", () => {
  it("should create the fetchOrderSuccess action", () => {
    const action = fetchOrderSuccess();
    expect(action.type).toEqual(OrderActionTypes.FETCH_ORDER_SUCCESS);
  });
});

describe("fetchOrderFailure action", () => {
  it("should create the fetchOrderFailure action", () => {
    const action = fetchOrderFailure();
    expect(action.type).toEqual(OrderActionTypes.FETCH_ORDER_FAILURE);
  });
});
