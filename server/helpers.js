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

handleError = (err, res) => {
  if (err.name === "ValidationError") {
    res.status(400).json(Object.values(err.errors));
  } else if (err.code === 11000) {
    res.status(404).json(err.errmsg.match(/\\".{3,}\\"/g));
  } else {
    res.status(500).json(err);
  }
};

module.exports = { handleObjectIdValidation, isAuthenticated, handleError };
