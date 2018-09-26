const { ObjectId } = require("mongodb");
const User = require("./models/user");

const handleObjectIdValidation = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "The object id is invalid." });
  }

  next();
};

const isAuthenticated = (req, res, next) => {
  const token = req.header("x-auth");

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch(() => {
      return res.status(401).json({ message: "Access forbidden" });
    });
};

module.exports = { handleObjectIdValidation, isAuthenticated };
