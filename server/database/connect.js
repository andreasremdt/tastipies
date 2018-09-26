var mongoose = require("mongoose");
require("../config/database");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  }
);
