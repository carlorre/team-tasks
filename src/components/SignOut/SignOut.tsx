import React from "react";
import { auth } from "../../firebase";
import { StyledButton } from "./SignOut.styled";

const SignOut = () => {
  return (
    auth.currentUser && (
      <StyledButton onClick={() => auth.signOut()}>
        <i className="fas fa-sign-out-alt"></i>
      </StyledButton>
    )
  );
};

export default SignOut;
