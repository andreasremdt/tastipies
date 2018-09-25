import React from "react";
import Banner from "./Banner";
import { Link } from "@reach/router";
import { hasError, formIsValid } from "../helpers/helpers";

class ForgotPasswordPage extends React.Component {
  state = {
    email: {
      error: false,
      value: ""
    }
  };

  handleInputChange = event => {
    this.setState({
      [event.target.id]: Object.assign({}, this.state[event.target.id], {
        value: event.target.value
      })
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
      console.log("Sending form...");
    }
  };

  render() {
    return (
      <React.Fragment>
        <Banner title="Reset your password" />
        <div className="container">
          <form
            action=""
            method="POST"
            noValidate
            className="form-wrapper"
            onSubmit={this.handleFormSubmit}
          >
            <p className="intro">
              So you forgot your password? Don't worry, enter your email below
              and we'll send you a link to reset it.
            </p>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email address
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

            <div className="form-footer">
              <button type="submit" className="button is-primary">
                Send Email
              </button>
              <p>
                <Link to="/login">Back to Login</Link>
              </p>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgotPasswordPage;
