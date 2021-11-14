import React from "react";
import { render, cleanup } from "@testing-library/react";
import { CollectionPage } from "./collection.component";

const mockProps = (otherProps) => ({
  ...otherProps,
  collection: { title: "", items: [] },
});
const component = (mockProps) => <CollectionPage {...mockProps} />;

afterEach(cleanup);

describe("Collection component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
});
