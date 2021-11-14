import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { CheckoutItem } from "./checkout-item.component";

const mockRemoveItem = jest.fn();
const mockAddItem = jest.fn();
const mockClearItem = jest.fn();
const mockProps = (otherProps) => ({
  ...otherProps,
  cartItem: [],
  clearItem: mockClearItem,
  addItem: mockAddItem,
  removeItem: mockRemoveItem,
});
const component = (mockProps) => <CheckoutItem {...mockProps} />;

afterEach(cleanup);

describe("CheckoutItem component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
  it("should fire addItem, removeIten, clearItem", async () => {
    render(component(mockProps()));
    await waitFor(() => fireEvent.click(screen.getByTestId("add-checkout-item")));
    expect(mockAddItem).toHaveBeenCalled();
    await waitFor(() => fireEvent.click(screen.getByTestId("remove-checkout-item")));
    expect(mockRemoveItem).toHaveBeenCalled();
    await waitFor(() => fireEvent.click(screen.getByTestId("clear-checkout-item")));
    expect(mockClearItem).toHaveBeenCalled();
  });
});
