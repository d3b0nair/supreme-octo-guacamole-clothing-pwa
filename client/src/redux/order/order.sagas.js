import { takeLatest, call, put, all } from "redux-saga/effects";

import { fetchOrder } from "../../firebase/firebase.utils";

import { fetchOrderFailure, fetchOrderSuccess } from "./order.actions";

import OrderActionsTypes from "./order.types";

export function* fetchOrderAsyncSTART({ payload }) {
  try {
    const order_data = yield call(fetchOrder, payload);
    yield put(fetchOrderSuccess(order_data));
  } catch (error) {
    yield put(fetchOrderFailure(error.message));
  }
}

export function* fetchOrderStart() {
  yield takeLatest(OrderActionsTypes.FETCH_ORDER_START, fetchOrderAsyncSTART);
}

export function* orderSagas() {
  yield all([call(fetchOrderStart)]);
}
