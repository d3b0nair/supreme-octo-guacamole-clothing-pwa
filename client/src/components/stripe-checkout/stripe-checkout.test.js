import React from "react";
import * as stripe from "@stripe/react-stripe-js";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { CheckoutForm } from "./stripe-checkout.component";

const { Elements } = jest.requireActual("@stripe/react-stripe-js");

const component = (mockProps) => (
  <Elements stripe={null}>
    <CheckoutForm {...mockProps} />
  </Elements>
);

const mockUpdatePaymentIntent = jest.fn();
const mockCheckoutSucceded = jest.fn();
const mockCreateOrder = jest.fn();
const mockTotal = 1234;

const mockProps = (otherProps) => ({
  ...otherProps,
  clientSecret: 1234,
  checkoutSucceded: mockCheckoutSucceded,
  createOrder: mockCreateOrder,
  updatePaymentIntent: mockUpdatePaymentIntent,
  total: mockTotal,
});

afterEach(cleanup);

describe("CheckoutForm component", () => {
  test("should render CheckoutForm component", () => {
    const { container } = render(component());
    expect(container).toMatchSnapshot();
  });
});

describe("when customer attempts to pay", () => {
  test("checkoutStatus changes button text changes to Processing... and then Paid X$", () => {
    const { rerender } = render(
      component(mockProps({ checkoutStatus: "PROCESSING" }))
    );
    expect(screen.getByRole("button")).toHaveTextContent("Processing...");
    rerender(component(mockProps({ checkoutStatus: "SUCCEDED" })));
    expect(screen.getByRole("button")).toHaveTextContent(`Paid ${mockTotal}$`);
  });

  test("handleSubmit helper calls updatePaymentIntent then creates payload which calls createOrder and checkoutSucceded if succeded", async () => {
    stripe.useStripe = jest.fn().mockImplementation(() => {
      return {
        confirmCardPayment: jest
          .fn()
          .mockReturnValue({ paymentIntent: { status: "succeeded" } }),
      };
    });
    stripe.useElements = jest.fn().mockImplementation(() => {
      return { getElement: jest.fn() };
    });

    render(component(mockProps()));
    await waitFor(() => fireEvent.submit(screen.getByRole("button")));
    await waitFor(
      () => expect(mockUpdatePaymentIntent).toHaveBeenCalledTimes(1),
      expect(mockCreateOrder).toBeCalled()
    );
  });
});
