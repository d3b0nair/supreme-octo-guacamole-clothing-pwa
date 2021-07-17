import { createSelector } from "reselect";

const selectOrder = (state) => state.selectedOrder;

export const selectOrderData = createSelector(
  [selectOrder],
  (selectedOrder) => selectedOrder.order
);

export const selectIsSelectedOrderLoaded = createSelector(
  [selectOrder],
  (selectedOrder) => !!selectedOrder.order
);
