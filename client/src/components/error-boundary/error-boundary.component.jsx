import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import history from "../../history";

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
  ErrorImageTitle,
} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }
  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/3suxlvm.png" />
          <ErrorImageTitle>Oh no! We tripped up!</ErrorImageTitle>
          <ErrorImageText>
            You had been told you should always check your shoes before getting
            up from the bleachers. Freshman were known to walk under them and
            tie peoples’ shoes together.
          </ErrorImageText>
          <CustomButton
            inverted
            onClick={() => {
              history.go(0);
            }}
          >
            RELOAD PAGE
          </CustomButton>
        </ErrorImageOverlay>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
