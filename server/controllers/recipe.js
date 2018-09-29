const _ = require("lodash");
const Recipe = require("../models/recipe");
const { handleError } = require("../helpers");

class RecipeController {
  static index(req, res) {
    Recipe.find({})
      .then(recipes => res.json(recipes))
      .catch(err => res.status(500).json(err));
  }

  static show(req, res) {
    Recipe.findById(req.params.id)
      .then(recipe => {
        if (!recipe) return res.status(404).send();

        res.json(recipe);
      })
      .catch(err => res.status(500).json(err));
  }

  static store(req, res) {
    const body = _.merge(_.pick(req.body, Object.keys(Recipe.schema.paths)), {
      _created: Date.now()
    });

    Recipe.create(body)
      .then(() => res.status(201).send())
      .catch(err => handleError(err, res));
  }

  static update(req, res) {
    const changes = _.pick(req.body, Object.keys(Recipe.schema.paths));

    Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: changes },
      { runValidators: true }
    )
      .then(recipe => {
        if (!recipe) return res.status(404).send();

        res.status(204).send();
      })
      .catch(err => handleError(err, res));
  }

  static destroy(req, res) {
    Recipe.findByIdAndDelete(req.params.id)
      .then(recipe => {
        if (!recipe) return res.status(404).send();

        res.status(204).send();
      })
      .catch(err => res.status(500).json(err));
  }
}

module.exports = RecipeController;
