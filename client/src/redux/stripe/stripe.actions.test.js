import StripeActionTypes from "./stripe.types";
import {
  createPaymentIntentID,
  createPaymentIntent_start,
  updatePaymentIntent_start,
  cancelPaymentIntent_start,
  createPaymentIntent_success,
  updatePaymentIntent_success,
  cancelPaymentIntent_success,
  createPaymentIntent_failure,
  updatePaymentIntent_failure,
  cancelPaymentIntent_failure,
  createClientSecret_start,
  cancelClientSecret_start,
  createClientSecret_failure,
  createClientSecret_success,
  cancelClientSecret_failure,
  cancelClientSecret_success,
} from "./stripe.actions";

describe("fetchCollectionsStart action", () => {
  it("should create the fetchCollectionsStart action", () => {
    const payload = { id: 1 };
    const action = createPaymentIntentID(payload);
    expect(action.type).toEqual(StripeActionTypes.CREATE_PAYMENT_INTENT_ID);
    expect(action.payload).toEqual(payload);
  });
});
describe("createPaymentIntent_start action", () => {
  it("should create the createPaymentIntent_start action", () => {
    const payload = [1, 2, 3];
    const action = createPaymentIntent_start(payload);
    expect(action.type).toEqual(StripeActionTypes.CREATE_PAYMENT_INTENT_START);
    expect(action.payload).toEqual(payload);
  });
});
describe("updatePaymentIntent_start action", () => {
  it("should create the updatePaymentIntent_start action", () => {
    const payload = [1, 2, 3];
    const action = updatePaymentIntent_start(payload);
    expect(action.type).toEqual(StripeActionTypes.UPDATE_PAYMENT_INTENT_START);
    expect(action.payload).toEqual(payload);
  });
});
describe("cancelPaymentIntent_start action", () => {
  it("should create the cancelPaymentIntent_start action", () => {
    const payload = [1, 2, 3];
    const action = cancelPaymentIntent_start(payload);
    expect(action.type).toEqual(StripeActionTypes.CANCEL_PAYMENT_INTENT_START);
    expect(action.payload).toEqual(payload);
  });
});
describe("createPaymentIntent_success action", () => {
  it("should create the createPaymentIntent_success action", () => {
    const action = createPaymentIntent_success();
    expect(action.type).toEqual(
      StripeActionTypes.CREATE_PAYMENT_INTENT_SUCCESS
    );
  });
});
describe("updatePaymentIntent_success action", () => {
  it("should create the updatePaymentIntent_success action", () => {
    const action = updatePaymentIntent_success();
    expect(action.type).toEqual(
      StripeActionTypes.UPDATE_PAYMENT_INTENT_SUCCESS
    );
  });
});
describe("cancelPaymentIntent_success action", () => {
  it("should create the cancelPaymentIntent_success action", () => {
    const action = cancelPaymentIntent_success();
    expect(action.type).toEqual(
      StripeActionTypes.CANCEL_PAYMENT_INTENT_SUCCESS
    );
  });
});
describe("createPaymentIntent_failure action", () => {
  it("should create the createPaymentIntent_failure action", () => {
    const payload = "error";
    const action = createPaymentIntent_failure(payload);
    expect(action.type).toEqual(StripeActionTypes.CREATE_PAYMENT_INTENT_FAIL);
    expect(action.payload).toEqual(payload);
  });
});
describe("updatePaymentIntent_failure action", () => {
  it("should create the updatePaymentIntent_failure action", () => {
    const payload = "error";
    const action = updatePaymentIntent_failure(payload);
    expect(action.type).toEqual(StripeActionTypes.UPDATE_PAYMENT_INTENT_FAIL);
    expect(action.payload).toEqual(payload);
  });
});
describe("cancelPaymentIntent_failure action", () => {
  it("should create the cancelPaymentIntent_failure action", () => {
    const payload = "error";
    const action = cancelPaymentIntent_failure(payload);
    expect(action.type).toEqual(StripeActionTypes.CANCEL_PAYMENT_INTENT_FAIL);
    expect(action.payload).toEqual(payload);
  });
});
describe("createClientSecret_start action", () => {
  it("should create the createClientSecret_start action", () => {
    const action = createClientSecret_start();
    expect(action.type).toEqual(StripeActionTypes.CREATE_CLIENT_SECRET_START);
  });
});
describe("cancelClientSecret_start action", () => {
  it("should create the cancelClientSecret_start action", () => {
    const action = cancelClientSecret_start();
    expect(action.type).toEqual(StripeActionTypes.CANCEL_CLIENT_SECRET_START);
  });
});
describe("createClientSecret_failure action", () => {
  it("should create the createClientSecret_failure action", () => {
    const payload = "error";
    const action = createClientSecret_failure(payload);
    expect(action.type).toEqual(StripeActionTypes.CREATE_CLIENT_SECRET_FAIL);
    expect(action.payload).toEqual(payload);
  });
});
describe("createClientSecret_success action", () => {
  it("should create the createClientSecret_success action", () => {
    const payload = { id: 1 };
    const action = createClientSecret_success(payload);
    expect(action.type).toEqual(StripeActionTypes.CREATE_CLIENT_SECRET_SUCCESS);
    expect(action.payload).toEqual(payload);
  });
});
describe("cancelClientSecret_failure action", () => {
  it("should create the cancelClientSecret_failure action", () => {
    const payload = "error";
    const action = cancelClientSecret_failure(payload);
    expect(action.type).toEqual(StripeActionTypes.CANCEL_CLIENT_SECRET_FAIL);
    expect(action.payload).toEqual(payload);
  });
});
describe("cancelClientSecret_success action", () => {
  it("should create the cancelClientSecret_success action", () => {
    const action = cancelClientSecret_success();
    expect(action.type).toEqual(StripeActionTypes.CANCEL_CLIENT_SECRET_SUCCESS);
  });
});
