import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import Home from "./Home";
import Header from "./Header";
import { StyledMain } from "./App.styled";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Header />
      <StyledMain>{user ? <Home /> : <SignIn />}</StyledMain>
    </>
  );
};

export default App;
