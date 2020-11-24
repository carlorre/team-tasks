import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../SignIn/SignIn";
import Home from "../Home/Home";
import Header from "../Header/Header";
import { StyledMain } from "./App.styled";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Header />
      <StyledMain>{user ? <Home user={user} /> : <SignIn />}</StyledMain>
    </>
  );
};

export default App;
