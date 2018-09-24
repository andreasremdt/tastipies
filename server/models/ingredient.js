var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The ingredient must have a title.'],
    minlength: 2,
    maxlength: 255,
    unique: true
  },
  description: String,
  image_url: String,
  created_at: {
    type: Date,
    default: Date.now,
    select: false
  }
});

var ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = ingredient;