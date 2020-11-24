import React from "react";
import firebase from "firebase/app";
import { auth } from "../../firebase";
import {
  StyledHeading,
  StyledLoginContainer,
  StyledSubHeading,
} from "./SignIn.style";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <StyledLoginContainer>
      <StyledHeading>Team Tasks</StyledHeading>
      <StyledSubHeading>Organize together</StyledSubHeading>
      <input
        style={{ width: "200px" }}
        type="image"
        src="images/google_signin.png"
        alt="signin"
        onClick={signInWithGoogle}
      />
    </StyledLoginContainer>
  );
};

export default SignIn;
