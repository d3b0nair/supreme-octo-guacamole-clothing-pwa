import React from "react";
import {
  render,
  cleanup,
} from "@testing-library/react";
import { createMockStore } from "../../redux/mockStore";
import { InvoicePage } from "./invoice.component";
import { Provider } from "react-redux";

const mockFetchOrder = jest.fn();
const mockMatch = {
  params: { id: "invoice_id" },
};
const mockState = {
  selectedOrder: {
    isLoading: true,
  },
};
const mockReducer = (
  state = {
    isLoading: true,
  },
  action
) => state;
const store = createMockStore({
  state: mockState,
  reducers: { selectedOrder: mockReducer },
});
const mockProps = (otherProps) => ({
  ...otherProps,
  match: mockMatch,
  fetchOrder: mockFetchOrder,
});
const component = (mockProps) => (
  <Provider store={store}>
    <InvoicePage {...mockProps} />
  </Provider>
);

afterEach(cleanup);

describe("Invoice Page component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
  it("should fetch selected order", () => {
    render(component(mockProps()));
    expect(mockFetchOrder).toHaveBeenCalled();
  });
});
