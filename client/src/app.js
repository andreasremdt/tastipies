import React from "react";
import { render } from "react-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import RecipeList from "./components/RecipeList";
import "./styles.scss";
import { Router } from "@reach/router";

const App = () => {
  return (
    <React.Fragment>
      <NavBar />

      <Router>
        <HomePage path="/" />
        <RecipeList path="/recipes" />
      </Router>
    </React.Fragment>
  );
};

render(<App />, document.getElementById("root"));
