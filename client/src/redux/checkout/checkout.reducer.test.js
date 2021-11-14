import { CheckoutActionTypes } from "./checkout.types";
import checkoutReducer, { INITIAL_STATE } from "./checkout.reducer";

describe("checkoutReducer", () => {
  it("should return initial state", () => {
    expect(checkoutReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  it("checkout_status should change to start when user creates new order", () => {
    const reducer = checkoutReducer(INITIAL_STATE, {
      type: CheckoutActionTypes.CHECKOUT_START,
    });
    expect(reducer.checkout_status).toBe("START");
  });
  it("checkout_status should change to processing from start", () => {
    const reducer = checkoutReducer(INITIAL_STATE, {
      type: CheckoutActionTypes.CHECKOUT_PROCESSING,
    });
    expect(reducer.checkout_status).toBe("PROCESSING");
  });
  it("checkout_status should change to succeded from processing", () => {
    const reducer = checkoutReducer(INITIAL_STATE, {
      type: CheckoutActionTypes.CHECKOUT_SUCCEDED,
    });
    expect(reducer.checkout_status).toBe("SUCCEDED");
  });
  it("checkout_status should reset reducer", () => {
    const reducer = checkoutReducer(INITIAL_STATE, {
      type: CheckoutActionTypes.CHECKOUT_RESET,
    });
    expect(reducer.checkout_status).toBe(false);
  });
  it("CREATE_ORDER_FAIL should occur set checkout_error", () => {
    const payload = "errorMsg";
    const reducer = checkoutReducer(INITIAL_STATE, {
      type: CheckoutActionTypes.CREATE_ORDER_FAIL,
      payload,
    });
    expect(reducer.checkout_error).toBe(payload);
  });
});
