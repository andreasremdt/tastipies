const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const tony = new mongoose.Types.ObjectId();

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Hulk",
    email: "hulk@smash.com",
    password: "GreenLantern"
  },
  {
    _id: tony,
    name: "Tony Stark",
    email: "tony.stark@avengers.org",
    password: "CapAmericaS%cks",
    _tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: tony, access: "auth" }, "abc123").toString()
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Captain America",
    email: "captain@avengers.org",
    password: "BaldEagle999"
  }
];
