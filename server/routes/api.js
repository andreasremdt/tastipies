var express = require('express');
var UserController = require('../controllers/user');
var RecipeController = require('../controllers/recipe');
var IngredientController = require('../controllers/ingredient');

module.exports = express.Router()
  .get('/users', UserController.index)
  .get('/users/:id', UserController.show)
  .post('/users', UserController.store)
  .patch('/users/:id', UserController.update)
  .delete('/users/:id', UserController.destroy)

  .get('/recipes', RecipeController.index)
  .get('/recipes/:id', RecipeController.show)
  .post('/recipes', RecipeController.store)
  .patch('/recipes/:id', RecipeController.update)
  .delete('/recipes/:id', RecipeController.destroy)

  .get('/ingredients', IngredientController.index)
  .get('/ingredients/:id', IngredientController.show)
  .post('/ingredients', IngredientController.store)
  .patch('/ingredients/:id', IngredientController.update)
  .delete('/ingredients/:id', IngredientController.destroy);