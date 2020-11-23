import React from 'react';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from './SignIn';
import Home from './Home';

const App = () => {

  const [user] = useAuthState(auth)
  
  return (
    <div>
      <section>
        {user ? <Home /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
