const mongoose = require("mongoose");
const { getDatabaseUri } = require("./config");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

mongoose.connect(
  getDatabaseUri(),
  {
    useNewUrlParser: true
  }
);
