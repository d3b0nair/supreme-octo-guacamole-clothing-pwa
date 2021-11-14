import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { createMockStore } from "../../redux/mockStore";
import { Provider } from "react-redux";
import { CheckoutPage } from "./checkout.component";
const mockReducer = (state = {}, action) => state;

const store = createMockStore({
  state: {},
  reducers: {
    checkout: mockReducer,
  },
});

const mockCheckoutStart = jest.fn();
const mockProps = (otherProps) => ({
  ...otherProps,
  total: 500,
  checkoutStatus: false,
  checkoutStart: mockCheckoutStart,
  currentUser: { displayName: "username" },
  cartItems: [{ id: 1 }, { id: 2 }],
});
const component = (mockProps) => (
  <Provider store={store}>
    <CheckoutPage {...mockProps} />
  </Provider>
);

afterEach(cleanup);

describe("Checkout component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps({ cartItems: [] })));
    expect(container).toMatchSnapshot();
  });
  it("if currentUser exsits and cartItems is not empty user can proceed with payment on a button click", async () => {
    render(component(mockProps()));
    await waitFor(() => fireEvent.click(screen.getByRole("button")));
    expect(mockCheckoutStart).toHaveBeenCalled();
  });
});
