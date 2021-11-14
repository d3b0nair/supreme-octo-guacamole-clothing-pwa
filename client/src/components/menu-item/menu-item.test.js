import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { MenuItem } from "./menu-item.component";

describe("MenuItem component", () => {
  const linkUrl = "/hats";
  const mockMatch = {
    url: "/shop",
  };

  const mockHistory = {
    push: jest.fn(),
  };
  const mockProps = (otherProps) => ({
    ...otherProps,
    match: mockMatch,
    history: mockHistory,
    linkUrl,
    size: "large",
    title: "hats",
    imageUrl: "testimage",
  });
  afterEach(cleanup);
  const component = (mockProps) => <MenuItem {...mockProps} />;

  it("should mount", () => {
    const { container } = render(component(mockProps()));
    expect(container).toMatchSnapshot();
  });

  it("should call history.push with the right string when MenuItemContainer clicked", async () => {
    render(component(mockProps()));
    const MenuItemContainer = screen.getByTestId("MenuItemContainer");
    await waitFor(() => fireEvent.click(MenuItemContainer));
    expect(mockHistory.push).toHaveBeenCalledWith(`${mockMatch.url}${linkUrl}`);
  });
});
