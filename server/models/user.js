const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required."],
    minlength: 2,
    maxlength: 100,
    trim: true
  },
  email: {
    type: String,
    required: [true, "The email address is required"],
    unique: true,
    minlength: 5,
    maxlength: 100,
    trim: true,
    validate: {
      validator: value =>
        /^([\w\d_\-\.]+)@([\w\d_\-\.]+)\.([\w]{2,5})$/.test(value),
      message: "{VALUE} is not a valid email address."
    }
  },
  password: {
    type: String,
    required: [
      true,
      "The password is required and needs to have at least 8 characters."
    ],
    minlength: 8
  },
  _tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ],
  _created: {
    type: Date
  },
  _updated: {
    type: Date,
    default: Date.now()
  },
  _recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ]
});

userSchema.methods.toJSON = function() {
  return _.pick(this.toObject(), ["_id", "email", "name"]);
};

userSchema.methods.generateAuthToken = function() {
  const access = "auth";
  const token = jwt
    .sign({ _id: this._id.toHexString(), access }, "abc123")
    .toString();

  this._tokens = this._tokens.concat([{ access, token }]);

  return this.save().then(() => {
    return token;
  });
};

userSchema.statics.findByToken = function(token) {
  let decoded;

  try {
    decoded = jwt.verify(token, "abc123");
  } catch (err) {
    return Promise.reject();
  }

  return this.findOne({
    _id: decoded._id,
    "_tokens.token": token,
    "_tokens.access": "auth"
  });
};

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(15, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

module.exports = User = mongoose.model("User", userSchema);
