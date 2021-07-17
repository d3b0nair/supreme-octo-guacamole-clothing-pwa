import React, { useState } from "react";
import { connect } from "react-redux";

import { signUpStart } from "../../redux/user/user.actions";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { SignUpContainer, TitleContainer } from "./sign-up.styles.jsx";

function SignUp(props) {
  const [newUser, setNewUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    const { displayName, email, password, confirmPassword } = newUser;
    const { signUpStart } = props;
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({ displayName, email, password });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <SignUpContainer>
      <TitleContainer>I do not have a account</TitleContainer>
      <span>Sign up wit your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={newUser.displayName}
          handleChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={newUser.email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={newUser.password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={newUser.confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit" style={{width: "100%"}}>Sign up</CustomButton>
      </form>
    </SignUpContainer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
