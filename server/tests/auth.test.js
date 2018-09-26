const request = require("supertest");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = require("../server");
const User = require("../models/user");
const userSeeds = require("./seeds/users");
const expect = require("expect");

beforeEach(done => {
  User.deleteMany({})
    .then(() => {
      return User.create(userSeeds);
    })
    .then(() => done());
});

after(done => {
  mongoose.disconnect(done);
});

describe("POST /auth/login", () => {
  it("should login user and return auth token", async () => {
    const user = userSeeds[0];
    const res = await request(app)
      .post("/auth/login")
      .send(_.pick(user, ["email", "password"]));

    expect(res.statusCode).toBe(200);
    expect(res.headers["x-auth"]).toBeDefined();
  });

  it("should reject invalid login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "blackwidow@gmail.com", password: "hackinthisthing" });

    expect(res.statusCode).toBe(400);
    expect(res.headers["x-auth"]).toBeUndefined();
  });
});

describe("POST /auth/logout", () => {
  it("should logout a user", async () => {
    const res = await request(app)
      .post("/auth/logout")
      .set("x-auth", userSeeds[1]._tokens[0].token);

    expect(res.statusCode).toBe(200);
  });
});
