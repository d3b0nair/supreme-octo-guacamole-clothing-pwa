import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { CollectionItem } from "./collection-item.component";

const mockAddItem = jest.fn();
const mockProps = (otherProps) => ({
  ...otherProps,
  item: [],
  addItem: mockAddItem,
});
const component = (mockProps) => <CollectionItem {...mockProps} />;

afterEach(cleanup);

describe("CollectionItem component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
  it("should call addItem on button click", async () => {
    render(component(mockProps()));
    await waitFor(() => fireEvent.click(screen.getByTestId("AddToCartButton")));
    expect(mockAddItem).toHaveBeenCalled();
  });
});
