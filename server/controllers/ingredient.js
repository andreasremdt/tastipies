var { ObjectId } = require('mongodb');
var Ingredient = require('../models/ingredient');
var _ = require('lodash');

require('../database/connect');

class IngredientController {
  static index(req, res) {
    Ingredient.find({})
      .then(ingredients => res.status(201).json(ingredients))
      .catch(error => res.status(500).json({ message: 'Error while fetching all ingredients.', error }));
  }



  static show(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'The given id is invalid.' });
    }

    Ingredient.findById(req.params.id).then(ingredient => {
      if (!ingredient) {
        return res.status(404).json({ message: 'No ingredient found with given id.' });
      } else {
        return res.json(ingredient);
      }
    }).catch(error => res.status(500).json({ message: 'Error while fetching single ingredient.', error }));
  }



  static store(req, res) {
    var data = _.pick(req.body, ['title', 'description', 'image_url']);
    
    Ingredient.create(data)
      .then(ingredient => res.json(ingredient))
      .catch(error => {
        if (error.code == 11000) {
          res.status(400).json({ message: 'This ingredient already exists.' });
        } else {
          res.status(400).json({ message: 'The validation has failed. Please correct your input.', error: error.errors });
        }
      });
  }



  static update(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'The given id is invalid.' });
    }

    var data = _.pick(req.body, ['title', 'description', 'image_url']);

    Ingredient.findByIdAndUpdate(req.params.id, { $set: data }, { runValidators: true }).then(ingredient => {
      if (!ingredient) {
        res.status(404).json({ message: 'No ingredient found with the given id.' });
      } else {
        res.json(ingredient);
      }
    }).catch(error => {
      if (error.code == 11000) {
        res.status(400).json({ message: 'The title already exists.' });
      } else {
        res.status(400).json({ message: 'The validation has failed. Please correct your input.', error: error.errors });
      }
    });
  }



  static destroy(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'The given id is invalid.' });
    }

    Ingredient.findByIdAndRemove(req.params.id).then(ingredient => {
      if (!ingredient) {
        res.status(404).json({ message: 'No ingredient found with the given id.' });
      } else {
        res.json(ingredient);
      }
    }).catch(error => res.status(500).json({ message: 'Ingredient could not be deleted.', error }));
  }
}

module.exports = IngredientController;