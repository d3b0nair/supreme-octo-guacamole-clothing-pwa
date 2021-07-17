import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectOrderData } from "../../redux/order/order.selectors";

import {
  OrderContainer,
  Title,
  ItemsPreview,
  CustomerInfo,
  OrderNumber,
  ItemContainer,
  ItemText,
  TotalPrice,
  InfoText,
  DeliveryInfo,
  DateText,
  InfoContainer
} from "./order-item.styles";

function OrderItem({ order_data }) {
  return (
    <OrderContainer onClick={(e) => e.stopPropagation()}>
      <OrderNumber>Order: {order_data.id}</OrderNumber>
      <Title>Delivery details:</Title>
      <InfoContainer>
      <CustomerInfo>
        <InfoText>Name: {order_data.customer.name}</InfoText>
        <InfoText>Email: {order_data.customer.email}</InfoText>
        <InfoText>Phone number: {order_data.customer.phone} </InfoText>
      </CustomerInfo>
      <DeliveryInfo>
        <InfoText>Street Adress: {order_data.customer.street}</InfoText>
        <InfoText>City: {order_data.customer.city}</InfoText>
        <InfoText>State: {order_data.customer.state} </InfoText>
        <InfoText>Zip Code: {order_data.customer.zip} </InfoText>
      </DeliveryInfo>
      </InfoContainer>
      <Title>Purchased Goods:</Title>
      <ItemsPreview>
        {order_data.items
          .map((item) => (
            <ItemContainer key={item.id}>
              <img alt="purchased product" src={item.imageUrl}/>
              <ItemText>{item.name}</ItemText>
              <ItemText>{item.price}$ x {item.quantity}</ItemText>
            </ItemContainer>
          ))}
      </ItemsPreview>
      <TotalPrice>TOTAL: ${order_data.total}</TotalPrice>
      <DateText>Purchased at {order_data.PlacedAt.slice(0, 24)}</DateText>
    </OrderContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  order_data: selectOrderData,
});

export default connect(mapStateToProps)(OrderItem);
