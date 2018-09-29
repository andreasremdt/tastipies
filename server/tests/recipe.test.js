const request = require("supertest");
const mongoose = require("mongoose");
const expect = require("expect");
const _ = require("lodash");
const app = require("../server");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const recipeSeeds = require("./seeds/recipes");
const userSeeds = require("./seeds/users");

before(done => {
  User.deleteMany({})
    .then(() => {
      return User.create(userSeeds);
    })
    .then(() => done());
});

beforeEach(done => {
  Recipe.deleteMany({})
    .then(() => {
      return Recipe.create([recipeSeeds[0], recipeSeeds[1]]);
    })
    .then(() => done());
});

after(() => {
  mongoose.disconnect();
});

describe("GET /api/recipes", () => {
  it("should return an array of recipes", async () => {
    const res = await request(app).get("/api/recipes");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });
});

describe("GET /api/recipes/:id", () => {
  it("should return a single recipe", async () => {
    const recipe = recipeSeeds[0];
    const res = await request(app).get(`/api/recipes/${recipe._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(recipe._id.toHexString());
    expect(res.body.title).toBe(recipe.title);
  });

  it("should return a 404 if the recipe doesn't exist", async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/recipes/${id}`);

    expect(res.statusCode).toBe(404);
  });

  it("should return a 400 if the object id is invalid", async () => {
    const id = "234";
    const res = await request(app).get(`/api/recipes/${id}`);

    expect(res.statusCode).toBe(400);
  });
});

describe("POST /api/recipes", () => {
  it("should create a new recipe", async () => {
    const res = await request(app)
      .post("/api/recipes")
      .set("x-auth", userSeeds[1]._tokens[0].token)
      .send(recipeSeeds[2]);
    const query = await Recipe.findOne({ title: recipeSeeds[2].title });

    expect(res.statusCode).toBe(201);
    expect(query.title).toBe(recipeSeeds[2].title);
  });

  it("should not create a recipe if unauthorized", async () => {
    const res = await request(app)
      .post("/api/recipes")
      .send(recipeSeeds[2]);
    const query = await Recipe.findOne({ title: recipeSeeds[2].title });

    expect(res.statusCode).toBe(401);
    expect(query).toBeNull();
  });

  it("should return a 400 if data is missing", async () => {
    const res = await request(app)
      .post("/api/recipes")
      .set("x-auth", userSeeds[1]._tokens[0].token)
      .send(_.omit(recipeSeeds[2], ["title"]));
    const query = await Recipe.findOne({ title: recipeSeeds[2].title });

    expect(res.statusCode).toBe(400);
    expect(query).toBeNull();
  });
});

describe("PATCH /api/recipes/:id", () => {
  const update = {
    title: "Recipe Update v2"
  };

  it("should update an existing recipe if authenticated", async () => {
    const recipe = recipeSeeds[1];
    const res = await request(app)
      .patch(`/api/recipes/${recipe._id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token)
      .send(update);
    const query = await Recipe.findOne({ title: update.title });

    expect(res.statusCode).toBe(204);
    expect(query.title).toBe(update.title);
  });

  it("should return a 401 if unauthorized", async () => {
    const recipe = recipeSeeds[1];
    const res = await request(app)
      .patch(`/api/recipes/${recipe._id}`)
      .send(update);
    const query = await Recipe.findOne({ title: update.title });

    expect(res.statusCode).toBe(401);
    expect(query).toBeNull();
  });

  it("should return a 404 if the recipe doesn't exist", async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/recipes/${id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token)
      .send(update);
    const query = await Recipe.findOne({ title: update.title });

    expect(res.statusCode).toBe(404);
    expect(query).toBeNull();
  });

  it("should return a 400 if data is missing", async () => {
    const recipe = recipeSeeds[1];
    const res = await request(app)
      .patch(`/api/recipes/${recipe._id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token)
      .send({ title: "" });
    const query = await Recipe.findOne({ title: update.title });

    expect(res.statusCode).toBe(400);
    expect(query).toBeNull();
  });

  it("should return a 400 if the object id is invalid", async () => {
    const id = "2245";
    const res = await request(app)
      .patch(`/api/recipes/${id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token)
      .send(update);

    expect(res.statusCode).toBe(400);
  });
});

describe("DELETE /api/recipes/:id", () => {
  it("should delete a recipe if authenticated", async () => {
    const recipe = recipeSeeds[1];
    const res = await request(app)
      .delete(`/api/recipes/${recipe._id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token);
    const query = await Recipe.findById(recipe._id);

    expect(res.statusCode).toBe(204);
    expect(query).toBeNull();
  });

  it("should return a 401 if unauthenticated", async () => {
    const recipe = recipeSeeds[0];
    const res = await request(app).delete(`/api/recipes/${recipe._id}`);
    const query = await Recipe.findById(recipe._id);

    expect(res.statusCode).toBe(401);
    expect(query.title).toBe(recipe.title);
  });

  it("should return a 404 if the recipe doesn't exist", async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app)
      .delete(`/api/recipes/${id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token);
    const query = await Recipe.find({});

    expect(res.statusCode).toBe(404);
    expect(query.length).toBe(2);
  });

  it("should return a 400 if the object id is invalid", async () => {
    const id = "3423";
    const res = await request(app)
      .delete(`/api/recipes/${id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token);
    const query = await Recipe.find({});

    expect(res.statusCode).toBe(400);
    expect(query.length).toBe(2);
  });
});
