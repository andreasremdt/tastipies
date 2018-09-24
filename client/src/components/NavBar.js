import React from "react";
import { Link } from "@reach/router";
import { isActiveNavLink } from "../helpers/helpers";

const NavBar = () => (
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
      <li>
        <Link to="/login" getProps={isActiveNavLink}>
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" getProps={isActiveNavLink}>
          Register
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
