var mongoose = require('mongoose');
require('../config/database');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
  auth: {
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PWD
  },
  useNewUrlParser: true
});