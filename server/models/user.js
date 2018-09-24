var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'The username is required.'],
    unique: true,
    minlength: 4,
    maxlength: 50,
    trim: true
  },
  firstName: {
    type: String,
    required: [true, 'The first name is required.'],
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'The last name is required.'],
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'The email address is required'],
    unique: true,
    minlength: 5,
    maxlength: 100,
    trim: true,
    validate: {
      validator: function (v) {
        return /^([\w\d_\-\.]+)@([\w\d_\-\.]+)\.([\w]{2,5})$/.test(v);
      },
      message: '{VALUE} doesn\'t appear to be a valid email address.'
    }
  },
  password: {
    type: String,
    required: [true, 'The password is required and needs to have at least 8 characters.'],
    minlength: 8
  },
  created: {
    type: Date
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  _recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
});

module.exports = User = mongoose.model('User', userSchema);