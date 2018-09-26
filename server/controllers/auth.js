const User = require("../models/user");

class AuthController {
  static login(req, res) {
    User.findByCredentials(req.body.email, req.body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header("x-auth", token).json(user);
        });
      })
      .catch(error => {
        res.status(400).json({ message: "Invalid credentials." });
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
}

module.exports = AuthController;
