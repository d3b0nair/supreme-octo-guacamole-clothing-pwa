/**
 * @jest-environment node
 */

import { takeLatest } from "redux-saga/effects";
import OrderActionTypes from "./order.types";

import { fetchOrderStart, fetchOrderAsyncSTART } from "./order.sagas";

describe("fetchOrderStart saga", () => {
  it("should trigger fetchOrderAsyncSTART", async () => {
    const generator = fetchOrderStart();
    expect(generator.next().value).toEqual(
      takeLatest(OrderActionTypes.FETCH_ORDER_START, fetchOrderAsyncSTART)
    );
  });
});
