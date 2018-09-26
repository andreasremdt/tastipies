const router = require("express").Router();
const UserController = require("../controllers/user");
const RecipeController = require("../controllers/recipe");
const { handleObjectIdValidation, isAuthenticated } = require("../helpers");

module.exports = router
  .get("/users", UserController.index)
  .post("/users", UserController.store)
  .get("/users/:id", handleObjectIdValidation, UserController.show)
  .patch(
    "/users/:id",
    isAuthenticated,
    handleObjectIdValidation,
    UserController.update
  )
  .delete(
    "/users/:id",
    isAuthenticated,
    handleObjectIdValidation,
    UserController.destroy
  )

  .get("/recipes", RecipeController.index)
  .post("/recipes", RecipeController.store)
  .get("/recipes/:id", handleObjectIdValidation, RecipeController.show)
  .patch(
    "/recipes/:id",
    isAuthenticated,
    handleObjectIdValidation,
    RecipeController.update
  )
  .delete(
    "/recipes/:id",
    isAuthenticated,
    handleObjectIdValidation,
    RecipeController.destroy
  );
