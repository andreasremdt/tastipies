var _ = require("lodash");
var User = require("../models/user");

require("../database/connect");

class UserController {
  static index(req, res) {
    User.find({})
      .then(users => res.json(users))
      .catch(error =>
        res.status(500).json({ message: "Could not display users.", error })
      );
  }

  static show(req, res) {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          res.status(404).json({ message: "The user does not exist." });
        } else {
          res.json(user);
        }
      })
      .catch(error =>
        res.status(500).json({ message: "User could not be retrieved.", error })
      );
  }

  static store(req, res) {
    const data = _.merge(_.pick(req.body, ["name", "email", "password"]), {
      _created: Date.now()
    });
    const user = new User(data);

    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res
          .status(201)
          .header("x-auth", token)
          .json(user);
      })
      .catch(error => {
        if (error.code == 11000) {
          res.status(400).json({
            message:
              "The email address is already taken. Please choose another email address or log in."
          });
        } else {
          res.status(400).json({
            message: "Validation has failed. Please correct your input.",
            error: error.errors
          });
        }
      });
  }

  static update(req, res) {
    const data = _.pick(req.body, ["name", "email", "password"]);

    User.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { runValidators: true }
    )
      .then(user => {
        if (!user) {
          res.status(404).json({ message: "The user does not exist." });
        } else {
          res.json(user);
        }
      })
      .catch(error => {
        if (error.code == 11000) {
          res.status(400).json({
            message:
              "The email address is already taken. Please choose another email address."
          });
        } else {
          res.status(400).json({
            message: "The validation has failed. Please correct your input.",
            error: error.errors
          });
        }
      });
  }

  static destroy(req, res) {
    User.findByIdAndRemove(req.params.id)
      .then(user => {
        if (!user) {
          res.status(404).json({ message: "The user does not exist." });
        } else {
          res.json(user);
        }
      })
      .catch(error =>
        res.status(500).json({ message: "User could not be deleted.", error })
      );
  }
}

module.exports = UserController;
