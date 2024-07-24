const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
   _id: { type: Number },
   name: { type: String, required: true },
   category: { type: String, required: true },
   calories: { type: Number, required: true },
   sugar: { type: Number, required: true },
   fat: { type: Number, required: true },
   totalSolids: { type: Number, required: true },
   msnf: { type: Number, required: true },
   protein: { type: Number, required: true },
   image: { type: String, required: true },
  // other fields...
}, { timestamps: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema, 'Ingredients');

module.exports = Ingredient;