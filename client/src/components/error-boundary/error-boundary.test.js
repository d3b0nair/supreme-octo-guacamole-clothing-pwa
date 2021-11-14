import React from "react";
import { shallow } from "enzyme";
import ErrorBoundary from "./error-boundary.component";

let wrapper;
beforeEach(() => {
  wrapper = shallow(<ErrorBoundary />);
});

describe("ErrorBoundary component", () => {
  it("should mount", () => {
    wrapper.setState({ hasErrored: true });
    expect(wrapper).toMatchSnapshot();
  });
});
