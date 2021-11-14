import styled from "styled-components";
import { frostedGlass } from "./../../global.styles";

export const SignInAndSignUpContainer = styled.div`
  width: 700px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  padding: 20px;
  ${frostedGlass}
  form {
    margin-top: 10%;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: 90%;
    margin: auto;
    padding: 15px;
  }
`;
