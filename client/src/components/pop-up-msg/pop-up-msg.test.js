import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import PopUpMsg from "./pop-up-msg.component";

describe("PopUpMsg component", () => {
  const mockOnDismiss = jest.fn();
  const mockAction = jest.fn();
  const mockProps = (otherProps) => ({
    ...otherProps,
    msg: "",
    onDismiss: mockOnDismiss,
    action: mockAction,
    actionText: "",
  });
  const component = (mockProps) => <PopUpMsg {...mockProps} />;

  afterEach(cleanup);

  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
  it("should call onDismiss when CloseBtn clicked", async () => {
    render(component(mockProps()));
    await waitFor(() => fireEvent.click(screen.getByTestId("CloseBtn")));
    expect(mockOnDismiss).toHaveBeenCalled();
  });
  it("should call action when CustomButton clicked", async () => {
    render(component(mockProps()));
    await waitFor(() => fireEvent.click(screen.getByTestId("CustomButton")));
    expect(mockAction).toHaveBeenCalled();
  });
});
