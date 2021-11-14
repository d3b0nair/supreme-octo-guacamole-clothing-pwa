import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  TitleContainer,
  PreviewContainer,
  CollectionPreviewContainer,
} from "./collection-preview.styles";

export function CollectionPreview({ title, items, history, match, routeName }) {
  const [itemsToLoad, setItemsToLoad] = useState(4);
  const [showingMore, setShowingMore] = useState(false);
  const showLess = () => {
    setItemsToLoad(5);
    setShowingMore(!showingMore);
  };
  const showMore = () => {
    setItemsToLoad(items.length);
    setShowingMore(!showingMore);
  };
  return (
    <CollectionPreviewContainer>
      <TitleContainer
        data-testid="TitleContainer"
        onClick={() => history.push(`${match.path}/${routeName}`)}
      >
        {title.toUpperCase()}
      </TitleContainer>
      <PreviewContainer>
        {items
          .filter((item, idx) => idx < itemsToLoad)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </PreviewContainer>
      <CustomButton
        inverted
        style={{ margin: "3vh 0 3vh 0" }}
        onClick={() => {
          showingMore ? showLess() : showMore();
        }}
      >
        {showingMore ? "SHOW LESS" : `SHOW MORE ${title.toUpperCase()}`}
      </CustomButton>
    </CollectionPreviewContainer>
  );
}

export default withRouter(CollectionPreview);
