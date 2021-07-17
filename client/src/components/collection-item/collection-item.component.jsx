import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

import {
  CollectionItemContainer,
  ImageContainer,
  CollectionFooterContainer,
  ItemName,
  ItemPrice,
  AddToCartButton,
} from "./collection-item.styles";

function CollectionItem({ item, addItem }) {
  const { id, name, price, imageUrl } = item;
  return (
    <CollectionItemContainer key={id}>
      <ImageContainer className="image" url={imageUrl} />
      <CollectionFooterContainer>
        <ItemName>{name}</ItemName>
        <ItemPrice>{price}$</ItemPrice>
      </CollectionFooterContainer>
      <AddToCartButton inverted onClick={() => addItem(item)}>
        Add to cart
      </AddToCartButton>
    </CollectionItemContainer>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(CollectionItem);
