import React, { useState, useEffect } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { SignInAndSignUpContainer } from "./sign-in-and-sign-up.styles.jsx";

function SignInAndSignUpPage() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [renderSignUpForMobile, setRenderSignUpForMobile] = useState(false);
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const renderDesktopPage = () =>
    windowSize.width > 800 ? (
      <>
        <SignIn />
        <SignUp />
      </>
    ) : null;

  const renderMobileView = () => {
    if (renderSignUpForMobile === true && windowSize.width < 800) {
      return (
        <>
          <SignUp />
          <CustomButton
            inverted
            onClick={() => setRenderSignUpForMobile(false)}
          >
            Sign in
          </CustomButton>
        </>
      );
    } else if (renderSignUpForMobile === false && windowSize.width < 800)
      return <>
        <SignIn />
        <CustomButton onClick={() => setRenderSignUpForMobile(true)}>
          Sign up with email
        </CustomButton>
      </>;
  };

  return (
    <SignInAndSignUpContainer>
      {renderDesktopPage()}
      {renderMobileView()}
    </SignInAndSignUpContainer>
  );
}

export default SignInAndSignUpPage;
