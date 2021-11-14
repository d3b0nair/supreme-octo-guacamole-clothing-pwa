import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import ScrollUpButton from "./scroll-up-button.component";

describe("ScrollUpButton component", () => {
  const component = (mockProps) => <ScrollUpButton {...mockProps} />;
  window.scrollTo = jest.fn();
  afterEach(cleanup);

  it("should mount", () => {
    const { container } = render(component());
    expect(container).toMatchSnapshot();
  });
  it("should call window.scrollTo when container is clicked", async () => {
    render(component());
    await waitFor(() =>
      fireEvent.click(screen.getByTestId("ScrollUpButtonContainer"))
    );
    expect(window.scrollTo).toBeCalledWith(0, 0);
  });
});
