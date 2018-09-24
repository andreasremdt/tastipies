import React from "react";
import { Link } from "@reach/router";

const RecipeLink = ({ _id, title, author, duration, thumbnail }) => (
  <article
    className="recipe-card"
    style={{ backgroundImage: `url(${thumbnail})` }}
  >
    <Link className="open" to={`/recipes/${_id}`}>
      View Recipe
    </Link>
    <div className="content">
      <h2>{title}</h2>
      <span className="author">By {author}</span>
      <span className="duration">{duration} Minutes</span>
    </div>
  </article>
);

export default RecipeLink;
