import React from "react";
import { render, cleanup } from "@testing-library/react";
import { CartItem } from "./cart-item.component";

const mockProps = (otherProps) => ({
  ...otherProps,
  item: {
    imageUrl: "",
    price: 1,
    name: "",
    quantity: 1,
  },
});
afterEach(cleanup);

const component = (mockProps) => <CartItem {...mockProps} />;
describe("CartIcon component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
});
