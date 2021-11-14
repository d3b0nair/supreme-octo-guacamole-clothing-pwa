import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Directory } from "./directory.component";

const component = (mockProps) => <Directory sections={[]} />;
afterEach(cleanup);

it("should mount", () => {
  const { container } = render(component());
  expect(container).toMatchSnapshot();
});
