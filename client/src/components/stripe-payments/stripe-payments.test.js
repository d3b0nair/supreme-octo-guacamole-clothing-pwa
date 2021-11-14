import React from "react";
import { render, cleanup } from "@testing-library/react";
import { createMockStore } from "../../redux/mockStore";
import { Provider } from "react-redux";
import { StripePayments } from "./stripe-payments.component";

const mockCheckoutSucceded = jest.fn();
const mockCreatePaymentIntent = jest.fn();
const mockUpdatePaymentIntent = jest.fn();
const mockCreateOrder = jest.fn();
const mockTotal = 1234;
const mockReducer = (state = {}, action) => state;
const store = createMockStore({
  state: {},
  reducers: { testReducer: mockReducer },
});
const mockProps = (otherProps) => ({
  ...otherProps,
  checkoutSucceded: mockCheckoutSucceded,
  createPaymentIntent: mockCreatePaymentIntent,
  updatePaymentIntent: mockUpdatePaymentIntent,
  createOrder: mockCreateOrder,
  cartItems: [
    {
      id: 111,
      name: "Brown Brimm",
      price: 35,
      imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      quantity: 4,
    },
    {
      imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
      id: 2,
      price: 18,
      name: "Blue Beanie",
      quantity: 4,
    },
  ],
  checkoutStatus: "START",
  total: mockTotal,
  userId: {},
  clientSecret: "1234",
});
const component = (mockProps) => (
  <Provider store={store}>
    <StripePayments {...mockProps} />
  </Provider>
);

afterEach(cleanup);

describe("StripePayments component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
  describe("when component mounts", () => {
    it("if paymentIntentId is already assigned the component should call updatePaymentIntent", () => {
      render(component(mockProps({ paymentIntentId: 1234 })));
      expect(mockUpdatePaymentIntent).toBeCalled();
    });
    it("if paymentIntentId is null it should call createPaymentIntent", () => {
      render(component(mockProps({ paymentIntentId: null })));
      expect(mockCreatePaymentIntent).toBeCalled();
    });
  });
});
