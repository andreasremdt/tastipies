import React from "react";
import { Link } from "@reach/router";
import { isActiveNavLink } from "../helpers/helpers";

const NavBar = props => (
  <nav className="navigation container">
    <Link className="title" to="/">
      Tastipies
    </Link>

    <ul>
      <li>
        <Link to="/" getProps={isActiveNavLink}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/recipes" getProps={isActiveNavLink}>
          Reciples
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
          About Us
        </Link>
      </li>
      {props.isLoggedIn ? (
        <li>
          <svg width="18" height="18" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"
            />
          </svg>
          <Link to="/profile" getProps={isActiveNavLink}>
            {props.name}
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
              <button type="button" onClick={props.handleLogout}>
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

export default NavBar;
