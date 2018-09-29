const _ = require("lodash");
const User = require("../models/user");
const { handleError } = require("../helpers");

class UserController {
  static index(req, res) {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  }

  static show(req, res) {
    User.findById(req.params.id)
      .then(user => {
        if (!user) return res.status(404).send();

        res.json(user);
      })
      .catch(err => res.status(500).json(err));
  }

  static store(req, res) {
    const body = _.merge(_.pick(req.body, Object.keys(User.schema.paths)), {
      _created: Date.now()
    });

    const user = new User(body);

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
      .catch(err => handleError(err, res));
  }

  static update(req, res) {
    const changes = _.pick(req.body, Object.keys(User.schema.paths));

    User.findByIdAndUpdate(
      req.params.id,
      { $set: changes },
      { runValidators: true }
    )
      .then(user => {
        if (!user) return res.status(404).send();

        res.status(204).send();
      })
      .catch(err => handleError(err, res));
  }

  static destroy(req, res) {
    User.findByIdAndRemove(req.params.id)
      .then(user => {
        if (!user) return res.status(404).send();

        res.status(204).send();
      })
      .catch(err => res.status(500).json(err));
  }
}

module.exports = UserController;
