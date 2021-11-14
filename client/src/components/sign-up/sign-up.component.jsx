import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserError } from "../../redux/user/user.selector";
import { signUpStart } from "../../redux/user/user.actions";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  SignUpContainer,
  TitleContainer,
  VisibleIconWrapper,
  HideIconWrapper,
  Wrapper,
  TextMsg,
  TextContainer,
} from "./sign-up.styles.jsx";

const ErrorMsgOnEmailAlreadyInUse = ({ emailAlreadyInUse }) =>
  emailAlreadyInUse ? (
    <TextContainer>
      <TextMsg>❌ Email is already in use</TextMsg>
    </TextContainer>
  ) : null;

const ErrorMsgOnPasswordDoesntMatch = ({ passwordDontMatch }) =>
  passwordDontMatch ? (
    <TextContainer>
      <TextMsg>❌ Passwords doesn't match</TextMsg>
    </TextContainer>
  ) : null;

const passwordRegex = "^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";

const PasswordStrenghtField = ({ password }) => {
  const eightCharactersRegex = new RegExp("[a-zA-Z]+.{8,}").test(`${password}`);
  const capitalLetterRegex = new RegExp("[A-Z]").test(`${password}`);
  const lowerCaseLetterRegex = new RegExp("[a-z]").test(`${password}`);
  const specialCharRegex = new RegExp("[!@#$&*]").test(`${password}`);
  const numRegex = new RegExp("[0-9]").test(`${password}`);
  return password.length > 0 ? (
    <TextContainer>
      <TextMsg style={eightCharactersRegex ? { color: "#299329de" } : null}>
        {eightCharactersRegex ? "✔️" : "❌"} At least 8 characters long
      </TextMsg>
      <TextMsg style={capitalLetterRegex ? { color: "#299329de" } : null}>
        {capitalLetterRegex ? "✔️" : "❌"} At least 1 capital letter
      </TextMsg>
      <TextMsg style={lowerCaseLetterRegex ? { color: "#299329de" } : null}>
        {lowerCaseLetterRegex ? "✔️" : "❌"} At least 1 lowercase letter
      </TextMsg>
      <TextMsg style={specialCharRegex ? { color: "#299329de" } : null}>
        {specialCharRegex ? "✔️" : "❌"} At least 1 special character
      </TextMsg>
      <TextMsg style={numRegex ? { color: "#299329de" } : null}>
        {numRegex ? "✔️" : "❌"} At least 1 numeric character
      </TextMsg>
    </TextContainer>
  ) : null;
};

export function SignUp({ signUpStart, userError }) {
  const [newUser, setNewUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordDontMatch, setPasswordDontMatch] = useState(null);
  const [showPasswordToggle, setShowPasswordToggle] = useState(false);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(null);
  useEffect(() => {
    if (newUser.password !== newUser.confirmPassword) {
      setPasswordDontMatch(true);
      return;
    } else if (newUser.password === newUser.confirmPassword) {
      setPasswordDontMatch(false);
    }
  }, [newUser.confirmPassword, newUser.password]);
  useEffect(() => {
    if (userError && userError.code === "auth/email-already-in-use") {
      setEmailAlreadyInUse(true);
    }
  }, [userError]);
  const handleSubmit = async (e) => {
    const { displayName, email, password } = newUser;
    e.preventDefault();

    await signUpStart({ displayName, email, password });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const ShowAndHidePasswordToggle = () =>
    showPasswordToggle ? (
      <VisibleIconWrapper
        onClick={() => setShowPasswordToggle(!showPasswordToggle)}
      />
    ) : (
      <HideIconWrapper
        onClick={() => setShowPasswordToggle(!showPasswordToggle)}
      />
    );

  return (
    <SignUpContainer>
      <TitleContainer>I do not have an account</TitleContainer>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          data-testid="displayName"
          type="text"
          name="displayName"
          value={newUser.displayName}
          handleChange={handleChange}
          label="Display Name"
          required
        />
        <Wrapper>
          <FormInput
            data-testid="email"
            type="email"
            name="email"
            value={newUser.email}
            handleChange={handleChange}
            label="Email"
            required
          />
          <ErrorMsgOnEmailAlreadyInUse emailAlreadyInUse={emailAlreadyInUse} />
        </Wrapper>
        <Wrapper>
          <FormInput
            data-testid="password"
            type={showPasswordToggle ? "text" : "password"}
            name="password"
            pattern={passwordRegex}
            value={newUser.password}
            handleChange={handleChange}
            label="Password"
            required
          />
          <ShowAndHidePasswordToggle />
          <PasswordStrenghtField password={newUser.password} />
        </Wrapper>
        <Wrapper>
          <FormInput
            type={showPasswordToggle ? "text" : "password"}
            data-testid="confirmPassword"
            name="confirmPassword"
            value={newUser.confirmPassword}
            handleChange={handleChange}
            label="Confirm Password"
            required
          />
          <ShowAndHidePasswordToggle />
          <ErrorMsgOnPasswordDoesntMatch
            passwordDontMatch={passwordDontMatch}
          />
        </Wrapper>
        <CustomButton
          data-testid="CustomButtonForSubmit"
          type="submit"
          style={{ width: "100%" }}
        >
          Sign up
        </CustomButton>
      </form>
    </SignUpContainer>
  );
}
const mapStateToProps = createStructuredSelector({
  userError: selectUserError,
});
const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
