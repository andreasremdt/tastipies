var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The recipe title is required.'],
    minlength: 4,
    maxlength: 255
  },
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
    required: [true, 'The recipe body is required.']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Recipe = mongoose.model('Recipe', recipeSchema);