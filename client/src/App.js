import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import RecipeList from "./components/RecipeList";
import LoginPage from "./components/LoginPage";
import { Router, navigate } from "@reach/router";
import axios from "axios";
import SignUpPage from "./components/SignUpPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import SubmitRecipePage from "./components/SubmitRecipePage";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: {}
  };

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.post["x-auth"] = token;

      axios
        .post("/auth/confirm")
        .then(res => {
          if (res.status === 200 && res.data) {
            this.setState({ user: res.data, isLoggedIn: true });
          }
        })
        .catch((err, res) => {
          console.log(err);
        });
    }
  }

  handleLogout = () => {
    axios.post("/auth/logout").then(res => {
      if (res.status === 200) {
        this.setState({ user: {}, isLoggedIn: false });
        navigate("/");
        localStorage.removeItem("token");
      }
    });
  };

  handleLogin = user => {
    this.setState({ user, isLoggedIn: true });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.state.isLoggedIn}
          name={this.state.user.name}
          handleLogout={this.handleLogout}
        />

        <Router>
          <HomePage path="/" />
          <RecipeList path="/recipes" />
          <LoginPage path="/login" handleLogin={this.handleLogin} />
          <SignUpPage path="/register" handleLogin={this.handleLogin} />
          <ForgotPasswordPage path="/forgot-password" />
          <SubmitRecipePage path="/recipes/create" />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
