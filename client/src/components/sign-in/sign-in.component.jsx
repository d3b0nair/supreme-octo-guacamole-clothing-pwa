import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

import { createStructuredSelector } from "reselect";
import { selectUserError } from "../../redux/user/user.selector";

import {
  SignInContainer,
  TitleContainer,
  ButtonsBarContainer,
} from "./sign-in.styles.jsx";

import { TextMsg, TextContainer } from "../sign-up/sign-up.styles.jsx";

const ErrorMsgOnCredentialsDontMatch = ({ credentialsDontMatch, userError }) =>
  credentialsDontMatch ? (
    <TextContainer>
      <TextMsg>
        {userError.code === "auth/too-many-requests"
          ? " Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          : "❌ Password/Email doesn't match"}
      </TextMsg>
    </TextContainer>
  ) : null;

export function SignIn({ googleSignInStart, emailSignInStart, userError }) {
  const [credentialsDontMatch, setCredentialsDontMatch] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { email, password } = credentials;
  useEffect(() => {
    if (userError) {
      setCredentialsDontMatch(true);
    }
  }, [userError]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <SignInContainer>
      <TitleContainer>I already have an account</TitleContainer>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="E-Mail"
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          required
        />
        <ErrorMsgOnCredentialsDontMatch
          credentialsDontMatch={credentialsDontMatch}
          userError={userError}
        />

        <ButtonsBarContainer>
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton
            data-testid="CustomButtonForGoogleSignInStart"
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
}
const mapStateToProps = createStructuredSelector({
  userError: selectUserError,
});
const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
