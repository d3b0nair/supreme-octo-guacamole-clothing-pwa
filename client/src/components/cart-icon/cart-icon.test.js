import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { CartIcon } from "./cart-icon.component";

const mockToggleCartHidden = jest.fn();
const mockItemCount = 0;
const mockProps = (otherProps) => {
  return {
    ...otherProps,
    itemCount: mockItemCount,
    toggleCartHidden: mockToggleCartHidden,
  };
};
const component = (mockProps) => {
  return <CartIcon {...mockProps} />;
};

afterEach(cleanup);

describe("CartIcon component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
  it("should call toggleCartHidden on a button click", async () => {
    render(component(mockProps()));
    await waitFor(() => fireEvent.click(screen.getByText(mockItemCount)));
    expect(mockToggleCartHidden).toHaveBeenCalled();
  });
});
