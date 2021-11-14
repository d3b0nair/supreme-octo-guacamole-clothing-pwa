import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { createMockStore } from "../../redux/mockStore";
import { Header } from "./header.component";
import { Provider } from "react-redux";

describe("Header component", () => {
  const store = createMockStore({}, {});

  const mockSignOutStart = jest.fn();
  const mockProps = (otherProps) => ({
    ...otherProps,
    currentUser: {
      uid: "123",
    },
    signOutStart: mockSignOutStart,
  });
  const history = createMemoryHistory();
  history.push("/signin");
  afterEach(cleanup);
  const component = (mockProps) => (
    <Router history={history}>
      <Provider store={store}>
        <Header {...mockProps} />
      </Provider>
    </Router>
  );

  it("should mount", () => {
    const { container } = render(component(mockProps({ hidden: true })));
    expect(container).toMatchSnapshot();
  });
  describe("if user loged in", () => {
    it("should call signOutStart method when link is clicked", async () => {
      render(component(mockProps()));
      const signOut = screen.getByTestId("signout-link");
      await waitFor(() => fireEvent.click(signOut));
      expect(mockSignOutStart).toHaveBeenCalled();
    });
  });

  describe("if hidden is false", () => {
    it("should render CartDropdown", () => {
      render(component(mockProps({ hidden: false })));
      const searchQuery = "Your cart is empty";
      const cartDropDown = screen.getByTestId("CartDropdown");
      expect(cartDropDown).toHaveTextContent(searchQuery);
    });
  });
});
