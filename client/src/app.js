import React from "react";
import { render } from "react-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import RecipeList from "./components/RecipeList";
import LoginPage from "./components/LoginPage";
import "./styles.scss";
import { Router } from "@reach/router";
import SignUpPage from "./components/SignUpPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";

const App = () => {
  return (
    <React.Fragment>
      <NavBar />

      <Router>
        <HomePage path="/" />
        <RecipeList path="/recipes" />
        <LoginPage path="/login" />
        <SignUpPage path="/register" />
        <ForgotPasswordPage path="/forgot-password" />
      </Router>
    </React.Fragment>
  );
};

render(<App />, document.getElementById("root"));
