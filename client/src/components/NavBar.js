import React from "react";
import { Link } from "@reach/router";
import { isActiveNavLink } from "../helpers/helpers";

class NavBar extends React.Component {
  state = {
    menuVisible: false
  };

  handleMenuClick = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  };

  render() {
    return (
      <nav className="navigation container">
        <Link className="title" to="/">
          Tastipies
        </Link>

        <button
          aria-label="Menu toggle"
          type="button"
          className={`menu-toggle${this.state.menuVisible ? " is-active" : ""}`}
          onClick={this.handleMenuClick}
        >
          <svg width="38" height="38" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 6h18v2.016h-18v-2.016zM3 12.984v-1.969h18v1.969h-18zM3 18v-2.016h18v2.016h-18z"
            />
          </svg>
        </button>

        <ul className={!this.state.menuVisible ? "is-hidden" : ""}>
          <li>
            <Link to="/" getProps={isActiveNavLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipes" getProps={isActiveNavLink}>
              Recipes
            </Link>
            <ul>
              <li>
                <Link to="/recipes" getProps={isActiveNavLink}>
                  All Recipes
                </Link>
              </li>
              <li>
                <Link to="/recipes/popular" getProps={isActiveNavLink}>
                  Popular Recipes
                </Link>
              </li>
              <li>
                <Link to="/recipes/index" getProps={isActiveNavLink}>
                  Recipe Index
                </Link>
              </li>
              <li>
                <Link to="/recipes/create" getProps={isActiveNavLink}>
                  Create Recipe
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/about" getProps={isActiveNavLink}>
              About
            </Link>
          </li>
          {this.props.isLoggedIn ? (
            <li>
              <svg width="18" height="18" viewBox="0 0 32 32">
                <path
                  fill="currentColor"
                  d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"
                />
              </svg>
              <Link to="/profile" getProps={isActiveNavLink}>
                {this.props.name}
              </Link>
              <ul>
                <li>
                  <Link to="/recipes/my" getProps={isActiveNavLink}>
                    My Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/profile" getProps={isActiveNavLink}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={this.props.handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/login" getProps={isActiveNavLink}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" getProps={isActiveNavLink}>
                  Sign Up
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

export default NavBar;
