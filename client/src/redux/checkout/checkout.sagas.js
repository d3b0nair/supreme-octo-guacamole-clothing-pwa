import { all, call, takeLatest, put } from "redux-saga/effects";

import { CheckoutActionTypes } from "./checkout.types";
import history from "../../history";

import { clearCart } from "../cart/cart.actions";
import {
  checkoutReset,
  createOrder_SUCCESS,
  checkoutSucceded,
  createOrder_FAIL,
} from "./checkout.actions";

export function* resetCheckoutAndCart() {
  yield put(checkoutSucceded());
  yield put(checkoutReset());
  yield put(clearCart());
}

export function* createOrderSTART({
  payload: { id, items, customer, total, userId },
}) {
  try {
    yield call(fetch, "/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, items, customer, total, userId }),
    });
    yield put(createOrder_SUCCESS());
    yield call(resetCheckoutAndCart);
    yield call(history.push, `/invoice/${id}`);
  } catch (error) {
    console.log(error);
    yield put(createOrder_FAIL(error));
  }
}

export function* onCheckoutSuccess() {
  yield takeLatest(CheckoutActionTypes.CREATE_ORDER_START, createOrderSTART);
}

export function* checkoutSagas() {
  yield all([call(onCheckoutSuccess)]);
}
