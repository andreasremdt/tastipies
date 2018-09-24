import React from "react";
import Banner from "./Banner";
import RecipeLink from "./RecipeLink";
import recipes from "../recipes_tmp.json";

class RecipeList extends React.Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    this.setState({ recipes: recipes });
  }

  render() {
    return (
      <React.Fragment>
        <Banner title="All Recipes" />

        <div className="container">
          <h1>Recipes here</h1>

          <div className="row">
            {this.state.recipes.map(recipe => (
              <RecipeLink
                key={recipe._id}
                _id={recipe._id}
                title={recipe.title}
                author={recipe.author}
                duration={recipe.duration}
                thumbnail={recipe.thumbnail}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RecipeList;
