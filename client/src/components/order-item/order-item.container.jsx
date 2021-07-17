import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsSelectedOrderLoaded } from "../../redux/order/order.selectors";

import WithSpinner from "../with-spinner/with-spinner.component";
import OrderItem from "./order-item.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsSelectedOrderLoaded(state),

});

const OrderContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(OrderItem);

export default OrderContainer;
