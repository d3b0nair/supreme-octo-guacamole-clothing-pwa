import { createStore } from "redux";
import { persistReducer } from "redux-persist";
import { rootReducer, persistConfig } from "./root-reducer";
export const createMockStore = ({ mockState, mockReducers }) => {
  const combinedReducers = persistReducer(
    persistConfig,
    rootReducer(mockReducers)
  );
  return createStore(combinedReducers, mockState);
};
