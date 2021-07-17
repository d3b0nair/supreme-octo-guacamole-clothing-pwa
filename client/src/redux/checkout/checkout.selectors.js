import { createSelector } from "reselect";

const selectCheckout = (state) => state.checkout;
export const selectCheckoutStatus = createSelector(
  [selectCheckout],
  (checkout) => checkout.checkout_status
);
