import React from "react";
import Banner from "./Banner";

class SubmitRecipePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Banner title="Create a new recipe" />
        <main className="container">
          <p>
            Nice to see that you want to submit a new recipe to this plattform.
            Go ahead and fill out the below information. Leave fields empty if
            you don&apos;t know how to fill them out.
          </p>

          <hr />

          <form action="" method="POST">
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="title" className="form-label">
                  Recipe title <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  required
                  maxLength="100"
                />
                <p className="form-info">Keep it short and descriptive.</p>
              </div>
              <div className="form-group col-6">
                <label htmlFor="photo" className="form-label">
                  Recipe photo
                </label>
                <input type="file" id="photo" className="form-control" />
                <p className="form-info">
                  Recommended size: 1440px by 800px or larger
                </p>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="video_url" className="form-label">
                Recipe video
              </label>
              <input type="text" id="video_url" className="form-control" />
              <p className="form-info">
                If you have your recipe on <em>YouTube</em>, you can paste its
                link here and it will display on the recipe page.
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="difficulty" className="form-label">
                Difficulty level <span className="asterisk">*</span>
              </label>
              <select id="difficulty" className="form-control" required>
                <option value="" />
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>
            <div className="row">
              <div className="form-group col-4">
                <label htmlFor="category" className="form-label">
                  Recipe category <span className="asterisk">*</span>
                </label>
                <select id="category" className="form-control" required>
                  <option value="" />
                  <option value="soup">Soup</option>
                  <option value="appetizer">Appetizer</option>
                  <option value="salads">Salads</option>
                  <option value="bread">Bread</option>
                  <option value="beverages">Beverage</option>
                  <option value="dessert">Dessert</option>
                  <option value="main dish">Main Dish</option>
                  <option value="sauce">Sauce</option>
                  <option value="side dish">Side Dish</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group col-4">
                <label htmlFor="method" className="form-label">
                  Cooking method <span className="asterisk">*</span>
                </label>
                <select id="method" className="form-control" required>
                  <option value="" />
                  <option value="instant pot">Instant Pot</option>
                  <option value="grilling">Grilling</option>
                  <option value="stove top">Stove Top</option>
                  <option value="oven">Oven</option>
                  <option value="baking">Baking</option>
                  <option value="no cook">No Cook</option>
                  <option value="microwave">Microwave</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group col-4">
                <label htmlFor="cuisine" className="form-label">
                  Cuisine <span className="asterisk">*</span>
                </label>
                <select id="cuisine" className="form-control" required>
                  <option value="" />
                  <option value="mexican">Mexican</option>
                  <option value="italian">Italian</option>
                  <option value="indian">Indian</option>
                  <option value="greek">Greek</option>
                  <option value="chinese">Chinese</option>
                  <option value="thai">Thai</option>
                  <option value="french">French</option>
                  <option value="spanish">Spanish</option>
                  <option value="german">German</option>
                  <option value="irish">Irish</option>
                  <option value="creole">Creole</option>
                  <option value="southern">Southern</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Short description
              </label>
              <textarea id="description" className="form-control" rows="5" />
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="prep-time" className="form-label">
                  Prep time <span className="asterisk">*</span>
                </label>
                <input type="range" id="prep-time" max="720" min="1" step="2" />
              </div>
              <div className="form-group col-6">
                <label htmlFor="prep-time" className="form-label">
                  Cook time <span className="asterisk">*</span>
                </label>
                <input type="range" id="cook-time" max="720" min="1" step="2" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="ingredients" className="form-label">
                Ingredients <span className="asterisk">*</span>
              </label>
              <textarea
                id="ingredients"
                rows="10"
                className="form-control"
                required
              />
              <p className="form-info">
                Enter one ingredient per line. Use a double dash to start a new
                section title. Seperate the ingredient amount from the
                ingredient name with a colon.
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="directions" className="form-label">
                Directions <span className="asterisk">*</span>
              </label>
              <textarea
                id="directions"
                rows="10"
                className="form-control"
                required
              />
              <p className="form-info">
                Add all of the cooking steps, one per line.
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="notes" className="form-label">
                Additional notes
              </label>
              <textarea id="notes" rows="10" className="form-control" />
              <p className="form-info">
                Add any other notes like recipe source, cooking hints, etc.
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="yields" className="form-label">
                Yields <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                id="yields"
                className="form-control"
                required
                maxLength="100"
                placeholder="e.g. 4 servings"
              />
            </div>
            <button type="submit" className="button is-primary">
              Save Recipe
            </button>
          </form>
        </main>
      </React.Fragment>
    );
  }
}

export default SubmitRecipePage;
