import React from "react";
import {
  render,
  cleanup,
} from "@testing-library/react";
import { OrderItem } from "./order-item.component";

describe("OrderItem component", () => {
  const mockItems = [];
  const mockCustomer = {
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  };

  const mockProps = (otherProps) => ({
    ...otherProps,
    order_data: {
      total: "",
      customer: mockCustomer,
      items: mockItems,
      PlacedAt: "",
    },
  });
  const component = (mockProps) => <OrderItem {...mockProps} />;

  afterEach(cleanup);

  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
});
