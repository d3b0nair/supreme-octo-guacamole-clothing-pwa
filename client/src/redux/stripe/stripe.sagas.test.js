/**
 * @jest-environment node
 */

import { takeLatest } from "redux-saga/effects";
import StripeActionTypes from "./stripe.types";
import { CheckoutActionTypes } from "../checkout/checkout.types";

import {
  createPaymentIntent,
  createPaymentIntentSTART,
  updatePaymentIntent,
  updatePaymentIntentSTART,
  cancelPaymentIntent,
  cancelPaymentIntentSTART,
  paymentIntentSucceded,
  cleanUp,
} from "./stripe.sagas";

describe("createPaymentIntent saga", () => {
  it("should trigger createPaymentIntentSTART", async () => {
    const generator = createPaymentIntent();
    expect(generator.next().value).toEqual(
      takeLatest(
        StripeActionTypes.CREATE_PAYMENT_INTENT_START,
        createPaymentIntentSTART
      )
    );
  });
});

describe("updatePaymentIntent saga", () => {
  it("should trigger createPaymentIntentSTART", async () => {
    const generator = updatePaymentIntent();
    expect(generator.next().value).toEqual(
      takeLatest(
        StripeActionTypes.UPDATE_PAYMENT_INTENT_START,
        updatePaymentIntentSTART
      )
    );
  });
});

describe("cancelPaymentIntent saga", () => {
  it("should trigger cancelPaymentIntentSTART", async () => {
    const generator = cancelPaymentIntent();
    expect(generator.next().value).toEqual(
      takeLatest(
        StripeActionTypes.CANCEL_PAYMENT_INTENT_START,
        cancelPaymentIntentSTART
      )
    );
  });
});

describe("paymentIntentSucceded saga", () => {
  it("should trigger cleanUp", async () => {
    const generator = paymentIntentSucceded();
    expect(generator.next().value).toEqual(
      takeLatest(CheckoutActionTypes.CHECKOUT_RESET, cleanUp)
    );
  });
});
