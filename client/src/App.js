import React from "react";
import NavBar from "./components/NavBar";
import "./App.scss";
import HomePage from "./components/HomePage";
import RecipeList from "./components/RecipeList";
import LoginPage from "./components/LoginPage";
import { Router } from "@reach/router";
import SignUpPage from "./components/SignUpPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import SubmitRecipePage from "./components/SubmitRecipePage";

class App extends React.Component {
  state = {
    isLoggedIn: false
  };

  componentDidMount() {
    fetch("/api/users")
      .then(res => {
        return res.json();
      })
      .then(users => {
        console.log(users);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />

        <Router>
          <HomePage path="/" />
          <RecipeList path="/recipes" />
          <LoginPage path="/login" />
          <SignUpPage path="/register" />
          <ForgotPasswordPage path="/forgot-password" />
          <SubmitRecipePage path="/recipes/create" />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
