import React from "react";
import {
  StyledHeader,
  StyledLogoContainer,
  StyledImage,
  StyledSignOutContainer,
} from "./Header.styled";
import SignOut from ".././SignOut/SignOut";

const Header = () => {
  return (
    <StyledHeader>
      <StyledLogoContainer>
        <StyledImage src="images/logo.png" alt="logo" />
      </StyledLogoContainer>
      <StyledSignOutContainer>
        <SignOut />
      </StyledSignOutContainer>
    </StyledHeader>
  );
};

export default Header;
