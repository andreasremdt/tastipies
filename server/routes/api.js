var express = require('express');
var UserController = require('../controllers/UserController');

module.exports = express.Router()
  .get('/users', UserController.index)
  .get('/users/:id', UserController.show)
  .post('/users', UserController.store)
  .patch('/users/:id', UserController.update)
  .delete('/users/:id', UserController.destroy);