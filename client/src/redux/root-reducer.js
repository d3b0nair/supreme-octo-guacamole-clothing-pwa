import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import checkoutReducer from "./checkout/checkout.reducer";
import stripeReducer from "./stripe/stripe.reducer";
import orderReducer from "./order/order.reducer";

export const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "stripe"],
};
const reducers = {
  user: userReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  directory: directoryReducer,
  shop: shopReducer,
  stripe: stripeReducer,
  selectedOrder: orderReducer,
};
export const rootReducer = (mockReducers) => {
  if (mockReducers) {
    return combineReducers({ ...reducers, ...mockReducers });
  } else {
    return combineReducers({ ...reducers });
  }
};

export default persistReducer(persistConfig, rootReducer());
