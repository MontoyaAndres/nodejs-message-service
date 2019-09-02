import React, { useContext } from "react";
import { Router, Redirect } from "@reach/router";

import { Header } from "./components/Header";

import Index from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";

import { Context } from "./context";

function App() {
  const { isAuth } = useContext(Context);

  return (
    <>
      <Header />
      <Router>
        {!isAuth && (
          <Redirect from="/" to="/login" noThrow>
            <Redirect from=":receiverId" to="/login" noThrow />
          </Redirect>
        )}
        {isAuth && <Redirect from="/login" to="/" noThrow />}
        {isAuth && <Redirect from="/register" to="/" noThrow />}
        <Index path="/">
          <Index path=":receiverId" />
        </Index>
        <Login path="/login" />
        <Register path="/register" />
      </Router>
    </>
  );
}

export default App;
