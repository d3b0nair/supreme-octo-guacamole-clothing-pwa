import { createSelector } from "reselect";


const selecStripe = (state) => state.stripe;

export const selectStripePayimentIntentId = createSelector(
  [selecStripe],
  (stripe) => stripe.paymentIntentId
);

export const selectClientSecret = createSelector(
  [selecStripe],
  (stripe) => stripe.clientSecret
);