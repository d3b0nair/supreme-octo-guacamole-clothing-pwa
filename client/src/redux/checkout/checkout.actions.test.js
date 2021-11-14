import { CheckoutActionTypes } from "./checkout.types";
import {
  checkoutStart,
  processCheckout,
  checkoutSucceded,
  checkoutReset,
  createOrder_START,
  createOrder_FAIL,
  createOrder_SUCCESS,
} from "./checkout.actions";

describe("checkoutStart action", () => {
  it("should create the checkoutStart action", () => {
    const action = checkoutStart();
    expect(action.type).toEqual(CheckoutActionTypes.CHECKOUT_START);
  });
});

describe("processCheckout action", () => {
  it("should create the processCheckout action", () => {
    const action = processCheckout();
    expect(action.type).toEqual(CheckoutActionTypes.CHECKOUT_PROCESSING);
  });
});
describe("checkoutSucceded action", () => {
  it("should create the checkoutSucceded action", () => {
    const action = checkoutSucceded();
    expect(action.type).toEqual(CheckoutActionTypes.CHECKOUT_SUCCEDED);
  });
});
describe("checkoutReset action", () => {
  it("should create the checkoutReset action", () => {
    const action = checkoutReset();
    expect(action.type).toEqual(CheckoutActionTypes.CHECKOUT_RESET);
  });
});
describe("createOrder_START action", () => {
  it("should create the createOrder_START action", () => {
    const mockPayload = {
      id: 1,
      items: [],
      customer: {},
      total: 1234,
    };
    const { id, items, customer, total } = mockPayload;
    const action = createOrder_START(id, items, customer, total);
    expect(action.type).toEqual(CheckoutActionTypes.CREATE_ORDER_START);
    expect(action.payload).toEqual(mockPayload);
  });
});
describe("createOrder_FAIL action", () => {
  it("should create the createOrder_FAIL action", () => {
    const action = createOrder_FAIL();
    expect(action.type).toEqual(CheckoutActionTypes.CREATE_ORDER_FAIL);
  });
});
describe("createOrder_SUCCESS action", () => {
  it("should create the createOrder_SUCCESS action", () => {
    const action = createOrder_SUCCESS();
    expect(action.type).toEqual(CheckoutActionTypes.CREATE_ORDER_SUCCESS);
  });
});
