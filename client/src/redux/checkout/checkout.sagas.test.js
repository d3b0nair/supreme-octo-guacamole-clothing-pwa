import { takeLatest } from "redux-saga/effects";
import { CheckoutActionTypes } from "./checkout.types";
import { onCheckoutSuccess, createOrderSTART } from "./checkout.sagas";

describe("onCheckoutSuccess saga", () => {
  it("should trigger createOrderSTART", async () => {
    const generator = onCheckoutSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(CheckoutActionTypes.CREATE_ORDER_START, createOrderSTART)
    );
  });
});
