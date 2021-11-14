import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { SignIn } from "./sign-in.component";

describe("SignIn component", () => {
const mockGoogleSignInStart = jest.fn();
  const mockProps = (otherProps) => ({
    ...otherProps,
    googleSignInStart: mockGoogleSignInStart,
  });
  const component = (mockProps) => <SignIn {...mockProps} />;

  afterEach(cleanup);

  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });

  it("should call mockGoogleSignInStart when button clicked", async () => {
    render(component(mockProps()));
    await waitFor(() => fireEvent.click(screen.getByTestId("CustomButtonForGoogleSignInStart")));
    expect(mockGoogleSignInStart).toHaveBeenCalled();
  });
});
