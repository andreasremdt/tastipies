import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./components/NavBar";
import "./styles.scss";

class App extends React.Component {
  render() {
    return <NavBar />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
