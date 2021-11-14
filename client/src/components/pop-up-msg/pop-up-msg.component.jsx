import React from "react";

import CustomButton from "../custom-button/custom-button.component";

import { MsgContainer, CloseBtn, Text } from "./pop-up-msg.styles";
import { ReactComponent as CloseBtnSvg } from "../../assets/closeBtn.svg";

function PopUpMsg({ msg, onDismiss, action, actionText }) {
  return (
    <MsgContainer>
      <CloseBtn data-testid="CloseBtn" onClick={onDismiss}>
        <CloseBtnSvg />
      </CloseBtn>
      <Text>{msg}</Text>
      <CustomButton data-testid="CustomButton" inverted style={{ width: "100%" }} onClick={action}>
        {actionText}
      </CustomButton>
    </MsgContainer>
  );
}

export default PopUpMsg;
