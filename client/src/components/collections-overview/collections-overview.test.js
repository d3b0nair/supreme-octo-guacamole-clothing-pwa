import React from "react";
import { render, cleanup } from "@testing-library/react";
import { CollectionsOverview } from "./collections-overview.component";

const mockProps = (otherProps) => ({ ...otherProps, collections: [] });
const component = (mockProps) => <CollectionsOverview {...mockProps} />;

afterEach(cleanup);

describe("CollectionsOverview component", () => {
  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });
});
