import React from "react";
import Banner from "./Banner";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import { hasError, formIsValid } from "../helpers/helpers";

class LoginPage extends React.Component {
  state = {
    email: {
      error: false,
      value: ""
    },
    password: {
      error: false,
      value: ""
    },
    serverError: null
  };

  handleInputChange = event => {
    this.setState({
      [event.target.id]: Object.assign({}, this.state[event.target.id], {
        value: event.target.value
      }),
      serverError: null
    });
  };

  handleValidation = field => {
    const error = hasError(field);

    this.setState({
      [field.id]: Object.assign({}, this.state[field.id], {
        error: error || false
      })
    });

    return error;
  };

  handleInputBlur = event => {
    this.handleValidation(event.target);
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (formIsValid(event.target, this.handleValidation)) {
      axios
        .post("/auth/login", {
          email: this.state.email.value,
          password: this.state.password.value
        })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.headers["x-auth"]);
            this.props.handleLogin(res.data);
            navigate("/profile");
          }
        })
        .catch(err => {
          this.setState({ serverError: err.response.data.message });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Banner title="Login" />
        <div className="container">
          <form
            action=""
            method="POST"
            noValidate
            className="form-wrapper"
            onSubmit={this.handleFormSubmit}
          >
            <p className="intro">
              Welcome back. Please enter your email address and password to
              login. <Link to="/register">Sign up</Link> now if you don&apos;t
              have an account yet.
            </p>

            {this.state.serverError && (
              <p className="server-error">{this.state.serverError}</p>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email address <span className="asterisk">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="john.doe@gmail.com"
                required
                className={`form-control${
                  this.state.email.error ? " has-error" : ""
                }`}
                value={this.state.email.value}
                pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$"
                onBlur={this.handleInputBlur}
                onChange={this.handleInputChange}
              />
              {this.state.email.error && (
                <p className="form-error">{this.state.email.error}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <span className="asterisk">*</span>
              </label>
              <input
                type="password"
                id="password"
                required
                className={`form-control${
                  this.state.password.error ? " has-error" : ""
                }`}
                value={this.state.password.value}
                onBlur={this.handleInputBlur}
                onChange={this.handleInputChange}
              />
              {this.state.password.error && (
                <p className="form-error">{this.state.password.error}</p>
              )}
            </div>
            <div className="form-footer">
              <button type="submit" className="button is-primary">
                Login
              </button>
              <p>
                Forgot your password?{" "}
                <Link to="/forgot-password">Click here</Link>.
              </p>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;
