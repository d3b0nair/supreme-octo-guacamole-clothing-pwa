import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { SignUp } from "./sign-up.component";

describe("SignUp component", () => {
  const mockSignUpStart = jest.fn();
  const mockProps = (otherProps) => ({
    ...otherProps,
    signUpStart: mockSignUpStart,
  });
  const component = (mockProps) => <SignUp {...mockProps} />;

  afterEach(cleanup);

  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
  it("should call mockSignUpStart when button clicked", async () => {
    render(component(mockProps()));
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("displayName"), {
        target: { value: "username" },
      })
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("email"), {
        target: { value: "email@test.com" },
      })
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("password"), {
        target: { value: "password" },
      })
    );
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("confirmPassword"), {
        target: { value: "password" },
      })
    );
    await waitFor(() =>
      fireEvent.click(screen.getByTestId("CustomButtonForSubmit"))
    );
    expect(mockSignUpStart).toHaveBeenCalled();
  });
});
