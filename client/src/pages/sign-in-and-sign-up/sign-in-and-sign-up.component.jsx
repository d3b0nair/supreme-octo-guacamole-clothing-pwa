import React, { useState, useEffect, useRef } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { SignInAndSignUpContainer } from "./sign-in-and-sign-up.styles.jsx";

function SignInAndSignUpPage() {
  const [renderSignUpForMobile, setRenderSignUpForMobile] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const lastWidth = useRef();
  useEffect(() => {
    const listenResizeEvent = () => {
      if (window.innerWidth !== lastWidth.current) {
        lastWidth.current = window.innerWidth;
        setWindowSize(window.innerWidth);
        windowSize > 800
          ? setRenderSignUpForMobile(true)
          : setRenderSignUpForMobile(false);
      }
    };
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return;
    } else {
      window.addEventListener("resize", listenResizeEvent);
    }
    return () => {
      window.removeEventListener("resize", listenResizeEvent);
    };
  }, [windowSize]);
  const RenderPage = () => {
    if (windowSize > 800) {
      return (
        <>
          <SignIn />
          <SignUp />
        </>
      );
    } else if (renderSignUpForMobile === true && windowSize < 800) {
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
    } else if (renderSignUpForMobile === false && windowSize < 800)
      return (
        <>
          <SignIn />
          <CustomButton onClick={() => setRenderSignUpForMobile(true)}>
            Sign up with email
          </CustomButton>
        </>
      );
  };

  return (
    <SignInAndSignUpContainer>
      <RenderPage />
    </SignInAndSignUpContainer>
  );
}

export default SignInAndSignUpPage;
