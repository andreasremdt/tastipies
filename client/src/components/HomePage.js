import React from "react";
import { Link } from "@reach/router";

const HomePage = () => (
  <React.Fragment>
    <section className="hero-unit">
      <h1>The World of Recipes</h1>
      <p>
        Search, find, create and share your favorite recipes with the entire
        world.
      </p>
      <Link to="/recipes" className="button is-primary">
        Explore Now
      </Link>
    </section>
    <div className="container">
      <h1>Homepage!!!</h1>;
    </div>
  </React.Fragment>
);

export default HomePage;
