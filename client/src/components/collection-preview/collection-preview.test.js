import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { CollectionPreview } from "./collection-preview.component";

const mockPush = jest.fn();
const mockProps = (otherProps) => ({
  ...otherProps,
  title: "",
  items: [],
  history: { push: mockPush },
  match: { path: jest.fn() },
  routeName: "",
});
const component = (mockProps) => <CollectionPreview {...mockProps} />;

afterEach(cleanup);

describe("CollectionItem component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
  it("should call addItem on button click", async () => {
    render(component(mockProps()));
    await waitFor(() => fireEvent.click(screen.getByTestId("TitleContainer")));
    expect(mockPush).toHaveBeenCalled();
  });
});
