import { all, call } from "redux-saga/effects";

import { shopSagas } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { checkoutSagas } from "./checkout/checkout.sagas";
import { stripeSagas } from "./stripe/stripe.sagas";
import { orderSagas } from "./order/order.sagas";

export default function* rootSaga() {
  yield all([
    call(shopSagas),
    call(userSagas),
    call(cartSagas),
    call(checkoutSagas),
    call(stripeSagas),
    call(orderSagas),
  ]);
}
