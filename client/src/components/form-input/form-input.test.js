import React from "react";
import { shallow } from "enzyme";
import FormInput from "./form-input.component";

let wrapper;
let mockHandleChange;
beforeEach(() => {
  mockHandleChange = jest.fn();
  const mockProps = {
    handleChange: mockHandleChange,
    label: "email",
    value: "test@gmail.com",
  };
  wrapper = shallow(<FormInput {...mockProps} />);
});

describe("FormInput component", () => {
  it("should mount", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should render FormInputLabel if there is a label", () => {
    expect(wrapper.exists("FormInputLabel")).toBe(true);
  });
  it("should call handleChange method when input changes", () => {
    wrapper.find("FormInputContainer").simulate("change");
    expect(mockHandleChange).toHaveBeenCalled();
  });
  it("should not render FormInputLabel if there is no label", () => {
    const mockNewProps = {
      label: "",
      value: "test@gmail.com",
      handleChange: mockHandleChange,
    };

    const newWrapper = shallow(<FormInput {...mockNewProps} />);

    expect(newWrapper.exists("FormInputLabel")).toBe(false);
  });
});
