/**
 * @jest-environment node
 */

import { takeLatest, put, call } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";
import { fetchCollectionsAsync, fetchCollectionsStart } from "./shop.sagas";

describe("fetchCollectionsStart saga", () => {
  it("should trigger fetchCollectionsAsync", async () => {
    const generator = fetchCollectionsStart();
    expect(generator.next().value).toEqual(
      takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
    );
  });
});
describe("fetch collections async saga", () => {
  const generator = fetchCollectionsAsync();

  it("should call convertCollectionsSnapshot saga", () => {
    generator.next();
    const mockSnapshot = {};
    expect(generator.next(mockSnapshot).value).toEqual(
      call(convertCollectionsSnapshotToMap, mockSnapshot)
    );
  });

  it("should fire fetchCollectionsSuccess if collectionsMap is succesful", () => {
    const mockCollectionsMap = {
      hats: { id: 1 },
    };

    expect(generator.next(mockCollectionsMap).value).toEqual(
      put(fetchCollectionsSuccess(mockCollectionsMap))
    );
  });

  it("should fire fetchCollectionsFailure if get collection fails at any point", () => {
    const newGenerator = fetchCollectionsAsync();
    const errorMsg = "error";
    newGenerator.next();
    expect(newGenerator.throw({ message: errorMsg }).value).toEqual(
      put(fetchCollectionsFailure(errorMsg))
    );
  });
});
