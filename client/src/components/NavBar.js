import React from "react";
import { Link } from "@reach/router";

const NavBar = () => (
  <nav className="navigation container">
    <Link className="title" to="/">
      Tastipies
    </Link>

    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/recipes">Reciples</Link>
        <ul>
          <li>
            <Link to="/recipes">All Recipes</Link>
          </li>
          <li>
            <Link to="/recipes/popular">Popular Recipes</Link>
          </li>
          <li>
            <Link to="/recipes/index">Recipe Index</Link>
          </li>
          <li>
            <Link to="/recipes/create">Create Recipe</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
