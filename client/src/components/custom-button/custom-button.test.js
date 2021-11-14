import React from "react";
import { render, cleanup } from "@testing-library/react";
import CustomButton from "./custom-button.component";

const mockProps = (otherProps) => ({ ...otherProps, children: "" });
const component = (mockProps) => <CustomButton {...mockProps} />;

afterEach(cleanup);

describe("CustomButton component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
});
