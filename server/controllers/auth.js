const User = require("../models/user");

class AuthController {
  static login(req, res) {
    User.findByCredentials(req.body.email, req.body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header("x-auth", token).json(user);
        });
      })
      .catch(() => {
        res
          .status(400)
          .json({ message: "Invalid credentials. Please try again." });
      });
  }

  static logout(req, res) {
    req.user
      .removeToken(req.token)
      .then(() => {
        res.json({ message: "User successfully logged out." });
      })
      .catch(() => {
        res.status(400).json({ message: "User could not be logged out." });
      });
  }

  static confirm(req, res) {
    const token = req.header("x-auth");

    User.findByToken(token)
      .then(user => {
        if (!user) {
          return res.send();
        }

        res.header("x-auth", token).json(user);
      })
      .catch(() => {
        return res.send();
      });
  }
}

module.exports = AuthController;
