var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "The recipe title is required."],
    minlength: 4,
    maxlength: 255
  },
  photo: {
    type: String,
    required: [true, "The recipe photo is required."]
  },
  video: String,
  difficulty: {
    type: String,
    required: [true, "The difficulty level is required."],
    enum: ["Easy", "Medium", "Difficult"]
  },
  category: {
    type: String,
    required: [true, "The recipe category is required."]
  },
  cooking_method: {
    type: String,
    required: [true, "The cooking method is required."]
  },
  cuisine: String,
  short_description: String,
  prep_time: Number,
  cook_time: Number,
  ingredients: [
    {
      type: String
    }
  ],
  instructions: [
    {
      type: String
    }
  ],
  notes: String,
  yields: {
    type: String,
    required: [true, "The amount of servings is required."]
  },
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  _created: {
    type: Date
  },
  _updated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Recipe = mongoose.model("Recipe", recipeSchema);
