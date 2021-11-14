import { takeLatest, put, all, call } from "redux-saga/effects";

import StripeActionTypes from "./stripe.types";
import { CheckoutActionTypes } from "../checkout/checkout.types";

import {
  createPaymentIntentID,
  createClientSecret_start,
  createClientSecret_failure,
  createClientSecret_success,
  cancelClientSecret_start,
  cancelClientSecret_failure,
  cancelClientSecret_success,
  createPaymentIntent_success,
  createPaymentIntent_failure,
  updatePaymentIntent_success,
  updatePaymentIntent_failure,
  cancelPaymentIntent_success,
  cancelPaymentIntent_failure,
  stripeReset,
} from "./stripe.actions";

export function* createClientSecretSTART(clientSecret) {
  try {
    yield put(createClientSecret_start());
    yield put(createClientSecret_success(clientSecret));
  } catch (error) {
    yield put(createClientSecret_failure(error));
  }
}

export function* cancelClientSecretSTART() {
  try {
    yield put(cancelClientSecret_start());
    yield put(cancelClientSecret_success());
  } catch (error) {
    yield put(cancelClientSecret_failure(error));
  }
}

export function* createPaymentIntentSTART({ payload: { cartItems } }) {
  try {
    let paymentIntentId = null;
    let clientSecret = null;
    yield window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        paymentIntentId = data.paymentIntentId;
        clientSecret = data.clientSecret;
      });
    yield put(createPaymentIntentID(paymentIntentId));
    yield createClientSecretSTART(clientSecret);
    yield put(createPaymentIntent_success());
  } catch (error) {
    yield put(createPaymentIntent_failure(error));
  }
}

export function* createPaymentIntent() {
  yield takeLatest(
    StripeActionTypes.CREATE_PAYMENT_INTENT_START,
    createPaymentIntentSTART
  );
}

export function* updatePaymentIntentSTART({ payload }) {
  try {
    window
      .fetch("/update-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload }),
      })
      .then((res) => {
        return res.json();
      });
    yield put(updatePaymentIntent_success());
  } catch (error) {
    yield put(updatePaymentIntent_failure(error));
  }
}

export function* updatePaymentIntent() {
  yield takeLatest(
    StripeActionTypes.UPDATE_PAYMENT_INTENT_START,
    updatePaymentIntentSTART
  );
}

export function* cancelPaymentIntentSTART({ payload: { id } }) {
  try {
    window.fetch("/cancel-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    yield put(cancelClientSecretSTART());
    yield put(cancelPaymentIntent_success());
  } catch (error) {
    yield put(cancelPaymentIntent_failure(error));
  }
}

export function* cancelPaymentIntent() {
  yield takeLatest(
    StripeActionTypes.CANCEL_PAYMENT_INTENT_START,
    cancelPaymentIntentSTART
  );
}

export function* cleanUp() {
  yield put(stripeReset());
}

export function* paymentIntentSucceded() {
  yield takeLatest(CheckoutActionTypes.CHECKOUT_RESET, cleanUp);
}

export function* stripeSagas() {
  yield all([
    call(createPaymentIntent),
    call(updatePaymentIntent),
    call(cancelPaymentIntent),
    call(cancelPaymentIntent),
    call(paymentIntentSucceded),
  ]);
}
