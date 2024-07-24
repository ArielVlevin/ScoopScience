const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
   _id: { type: Number },
   recipename: { type: String, required: true },
   ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  // other fields...
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema, 'Recipes');

module.exports = Recipe;