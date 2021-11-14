
import React from "react";
import { createMockStore } from "../../redux/mockStore";
import { ShopPage } from "./shop.component";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe("ShopPage", () => {
  const mockReducer = (
    state = {
      isFetching: true,
    },
    action
  ) => state;

  const mockState = {
    shop: {
      isFetching: true,
    },
  };

  const mockFetchCollectionsStart = jest.fn();

  const store = createMockStore({
    state: mockState,
    reducers: { shop: mockReducer },
  });

  const mockMatch = {
    path: "",
  };

  const mockProps = (otherProps) => ({
    ...otherProps,
    match: mockMatch,
    fetchCollectionsStart: mockFetchCollectionsStart,
  });
  const component = (mockProps) => (
    <BrowserRouter>
      <Provider store={store}>
        <ShopPage {...mockProps} />
      </Provider>
    </BrowserRouter>
  );

  afterEach(cleanup);

  describe("Shop Page component", () => {
    it("should mount", () => {
      const { container } = render(component(mockProps()));
      expect(container).toMatchSnapshot();
    });
    it("should fetch collections", () => {
      render(component(mockProps()));
      expect(mockFetchCollectionsStart).toHaveBeenCalled();
    });
  });
});
