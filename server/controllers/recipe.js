var _ = require('lodash');
var { ObjectId } = require('mongodb');
var User = require('../models/user');
var User = require('../models/recipe');

require('../database/connect');

module.exports = class UserController {
  static index(req, res) {
    // User.find({})
    //   .then(users => res.json(users))
    //   .catch(error => res.status(500).json({ message: 'Could not display users.', error }));
  }

  static show(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'The given ID is not valid.' });
    }

    User.findById(req.params.id).then(user => {
      if (!user) {
        res.status(404).json({ message: 'User could not be found.' });
      } else {
        res.json(user);
      }
    }).catch(error => res.status(500).json({ message: 'User could not be retrieved.', error }));
  }

  static store(req, res, next) {
    Recipe.create(req.body)
      .then(user => res.json(user))
      .catch(err => console.error(err));
    /*User.create(_.merge(_.pick(req.body, ['firstName', 'lastName', 'username', 'password', 'email', 'active']), { created: Date.now() }))
      .then(user => res.json({ message: 'New user has been created successfully', user }))
      .catch(error => {
        if (error.code == 11000) {
          if (error.message.includes('$username')) {
            res.status(400).json({ message: 'The username is already taken. Please choose another username.' });
          } else if (error.message.includes('$email')) {
            res.status(400).json({ message: 'The email address is already taken. Please choose another email address.' });
          }
        } else {
          res.status(400).json({ message: 'The validation has failed. Please correct your input.', error: error.errors });
        }
      });*/
  }

  static update(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'The given ID is not valid.' });
    }

    User.findByIdAndUpdate(req.params.id, { $set: _.pick(req.body, 'firstName', 'lastName', 'password', 'email', 'username', 'active') }, { runValidators: true }).then(user => {
      if (!user) {
        res.status(404).json({ message: 'No user found with the given ID.' });
      } else {
        res.json({ message: 'User has been updated successfully.', user })
      }
    }).catch(error => {
      if (error.code == 11000) {
        res.status(400).json({ message: 'The email address is already taken. Please choose another email address.' });
      } else {
        res.status(400).json({ message: 'The validation has failed. Please correct your input.', error: error.errors });
      }
    });
  }

  static destroy(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'The given ID is not valid.' });
    }

    User.findByIdAndRemove(req.params.id).then(user => {
      if (!user) {
        res.status(404).json({ message: 'No user found with the given ID.' });
      } else {
        res.json({ message: 'User has been deleted successfully.', user })
      }
    }).catch(error => res.status(500).json({ message: 'User could not be deleted.', error }));
  }
}