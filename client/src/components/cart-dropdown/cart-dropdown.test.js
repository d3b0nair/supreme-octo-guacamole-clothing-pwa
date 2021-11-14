import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import * as Component from "./cart-dropdown.component";

const mockProps = (otherProps) => ({
  ...otherProps,
  history: { push: jest.fn() },
  cartItems: [],
  dispatch: jest.fn(),
});

const component = (mockProps) => <Component.CartDropdown {...mockProps} />;

afterEach(cleanup);

describe("CartDropdown component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
  it("on button click it should open checkout page and hide itself", async () => {
    render(component(mockProps()));
    const handleClick = jest.spyOn(Component, "handleClick");
    await waitFor(() => fireEvent.click(screen.getByRole("button")));
    expect(handleClick).toHaveBeenCalled();
  });
});
