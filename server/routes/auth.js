const router = require("express").Router();
const AuthController = require("../controllers/auth");
const { isAuthenticated } = require("../helpers");

module.exports = router
  .post("/login", AuthController.login)
  .post("/logout", isAuthenticated, AuthController.logout)
  .post("/confirm", AuthController.confirm);
