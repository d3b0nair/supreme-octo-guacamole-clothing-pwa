import React from "react";
import { render, cleanup } from "@testing-library/react";
import SignInAndSignUpPage from "./sign-in-and-sign-up.component";
import { createMockStore } from "../../redux/mockStore";

import { Provider } from "react-redux";

describe("SignIn and SignUp Page", () => {
  afterEach(cleanup);
  const component = () => (
    <Provider store={store}>
      <SignInAndSignUpPage />
    </Provider>
  );
  const mockReducer = (state = {}, action) => state;
  const store = createMockStore({
    state: {},
    reducers: { testReducer: mockReducer },
  });
  const { container } = render(component());

  it("should mount", () => {
    jest.spyOn(window.screen, "width", "get").mockReturnValue(800);
    jest.spyOn(window.screen, "height", "get").mockReturnValue(800);
    expect(container).toMatchSnapshot();
  });
});
