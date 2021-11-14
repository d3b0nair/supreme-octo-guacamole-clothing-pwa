/**
 * @jest-environment node
 */

import ShopActionTypes from "./shop.types";
import {
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
  fetchCollectionsStartAsync,
} from "./shop.actions";

describe("fetchCollectionsStart action", () => {
  it("should create the fetchCollectionsStart action", () => {
    const action = fetchCollectionsStart();
    expect(action.type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_START);
  });
});

describe("fetchCollectionsSuccess action", () => {
  it("should create the fetchCollectionsSuccess action", () => {
    const action = fetchCollectionsSuccess();
    expect(action.type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_SUCCESS);
  });
});

describe("fetchCollectionsFailure action", () => {
  it("should create the fetchCollectionsFailure action", () => {
    const action = fetchCollectionsFailure();
    expect(action.type).toEqual(ShopActionTypes.FETCH_COLLECTIONS_FAILURE);
  });
});
describe("fetchCollectionsStartAsync action", () => {
  it("should create the fetchCollectionsStartAsync action", () => {
    const mockActionCreator = fetchCollectionsStartAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(fetchCollectionsStart());
  });
});
