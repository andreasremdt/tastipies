const request = require("supertest");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = require("../server");
const User = require("../models/user");
const userSeeds = require("./seeds/users");

beforeEach(() => {
  return User.deleteMany({}).then(() => {
    User.insertMany(userSeeds);
  });
});

afterAll(done => {
  mongoose.disconnect(done);
});

describe("GET /api/users", () => {
  test("it should return an array of users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(userSeeds.length);
    expect(res.body).toMatchObject(_.pick(userSeeds, ["_id", "name", "email"]));
  });
});

describe("GET /api/users/:id", () => {
  test("it should return a single user", async () => {
    const user = userSeeds[0];
    const res = await request(app).get(`/api/users/${user._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(user._id.toHexString());
    expect(res.body.email).toBe(user.email);
  });

  test("it should return a 404 if the user doesn't exist", async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(404);
  });

  test("it should return a 400 if the object id is invalid", async () => {
    const id = "234";
    const res = await request(app).get(`/api/users/${id}`);

    expect(res.statusCode).toBe(400);
  });
});

describe("POST /api/users", () => {
  const user = {
    name: "Captain America",
    email: "captain@avengers.org",
    password: "BaldEagle999"
  };

  test("it should create a new user and return it", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(user);
    const query = await User.findOne({ name: user.name });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(_.pick(user, ["_id", "email", "name"]));
    expect(query).toMatchObject(_.pick(user, ["_id", "email", "name"]));
  });

  test("it should return a 400 if data is missing", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(_.omit(user, ["name"]));
    const query = await User.findOne({ name: user.name });

    expect(res.statusCode).toBe(400);
    expect(query).toBeNull();
  });

  test("it should return a 400 if the email is a duplicate", async () => {
    const res = await request(app)
      .post("/api/users")
      .send(_.merge(user, { email: userSeeds[0].email }));
    const query = await User.find({});

    expect(res.statusCode).toBe(400);
    expect(query.length).toBe(userSeeds.length);
  });
});

describe("PATCH /api/users/:id", () => {
  const update = {
    name: "Captain America",
    email: "captain@avengers.org",
    password: "BaldEagle999"
  };

  test("it should update an existing user if authenticated", async () => {
    const user = userSeeds[1];
    const res = await request(app)
      .patch(`/api/users/${user._id}`)
      .set("x-auth", user._tokens[0].token)
      .send(update);
    const query = await User.findOne({ name: update.name });

    expect(res.statusCode).toBe(200);
    expect(query).toMatchObject(update);
  });

  test("it should return a 401 if unauthenticated", async () => {
    const user = userSeeds[1];
    const res = await request(app)
      .patch(`/api/users/${user._id}`)
      .send(update);
    const query = await User.findOne({ name: update.name });

    expect(res.statusCode).toBe(401);
  });

  test("it should return a 404 if the user doesn't exist", async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/users/${id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token)
      .send(update);
    const query = await User.find({ email: update.email });

    expect(res.statusCode).toBe(404);
    expect(query.length).toBe(0);
  });

  test("it should return a 400 if data is missing", async () => {
    const user = userSeeds[1];
    const res = await request(app)
      .patch(`/api/users/${user._id}`)
      .set("x-auth", user._tokens[0].token)
      .send({ name: "" });
    const query = await User.find({ email: update.email });

    expect(res.statusCode).toBe(400);
    expect(query.length).toBe(0);
  });

  test("it should return a 400 if the object id is invalid", async () => {
    const id = "2245";
    const res = await request(app)
      .patch(`/api/users/${id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token)
      .send(update);

    expect(res.statusCode).toBe(400);
  });

  test("it should return a 400 if the email is a duplicate", async () => {
    const user = userSeeds[1];
    const res = await request(app)
      .patch(`/api/users/${user._id}`)
      .set("x-auth", user._tokens[0].token)
      .send({ email: userSeeds[0].email });
    const query = await User.find({ email: userSeeds[0].email });

    expect(res.statusCode).toBe(400);
    expect(query.length).toBe(1);
  });
});

describe("DELETE /api/users/:id", () => {
  test("it should delete a user if authenticated", async () => {
    const user = userSeeds[1];
    const res = await request(app)
      .delete(`/api/users/${user._id}`)
      .set("x-auth", user._tokens[0].token);
    const query = await User.findById(user._id);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(user.email);
    expect(res.body._id).toBe(user._id.toHexString());
    expect(query).toBeNull();
  });

  test("it should not delete a user if unauthenticated", async () => {
    const user = userSeeds[0];
    const res = await request(app).delete(`/api/users/${user._id}`);
    const query = await User.findById(user._id);

    expect(res.statusCode).toBe(401);
    expect(query).toMatchObject(_.pick(user, ["_id", "name", "email"]));
  });

  test("it should return a 404 if the user doesn't exist", async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app)
      .delete(`/api/users/${id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token);
    const query = await User.find({});

    expect(res.statusCode).toBe(404);
    expect(query.length).toBe(userSeeds.length);
  });

  test("it should return a 400 if the object id is invalid", async () => {
    const id = "3423";
    const res = await request(app)
      .delete(`/api/users/${id}`)
      .set("x-auth", userSeeds[1]._tokens[0].token);
    const query = await User.find({});

    expect(res.statusCode).toBe(400);
    expect(query.length).toBe(userSeeds.length);
  });
});
