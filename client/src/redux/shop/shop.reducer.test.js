import shopReducer, { INITIAL_STATE } from "./shop.reducer";
import ShopActionTypes from "./shop.types";

describe("shopReducer", () => {
  it("should return initial state", () => {
    expect(shopReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  it("FETCH_COLLECTIONS_START should create trigger isFetching", () => {
    const reducer = shopReducer(INITIAL_STATE, {
      type: ShopActionTypes.FETCH_COLLECTIONS_START,
    });
    expect(reducer.isFetching).toBe(true);
  });
  it("FETCH_COLLECTIONS_SUCCESS should create trigger isLoading and send payload with order", () => {
    const payload = [{ id: 1 }, { id: 2 }];
    const prevState = { ...INITIAL_STATE, isLoading: true };
    const reducer = shopReducer(prevState, {
      type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
      payload,
    });
    expect(reducer.collections).toBe(payload);
    expect(reducer.isFetching).toBe(false);
  });
  it("FETCH_COLLECTIONS_FAILURE should create switch isLoading to false and send payload with error msg", () => {
    const payload = "error";
    const prevState = { ...INITIAL_STATE, isFetching: true };
    const reducer = shopReducer(prevState, {
      type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
      payload,
    });
    expect(reducer.errorMessage).toBe(payload);
    expect(reducer.isFetching).toBe(false);
  });
});
