import React, { useEffect } from "react";

import { connect } from "react-redux";

import { fetchOrderStart } from "../../redux/order/order.actions";
import OrderContainer from "../../components/order-item/order-item.container";

function InvoicePage(props) {
  const { fetchOrder } = props;
  useEffect(() => {
    fetchOrder(props.match.params.id);
  }, [fetchOrder, props.match.params.id]);
  return (
      <OrderContainer />
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchOrder: (urlParam) => dispatch(fetchOrderStart(urlParam)),
});

export default connect(null, mapDispatchToProps)(InvoicePage);
