import React from "react";

import { ScrollUpButtonContainer } from "./scroll-up-button.styles";

import { ReactComponent as UpIcon } from "../../assets/scrollUp.svg";

function ScrollUpButton() {
  return (
    <ScrollUpButtonContainer onClick={() => window.scrollTo(0, 0)}>
      <UpIcon />
    </ScrollUpButtonContainer>
  );
}

export default ScrollUpButton;
