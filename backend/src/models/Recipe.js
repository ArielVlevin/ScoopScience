import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
   _id: { type: Number },
   recipename: { type: String, required: true },
   ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
  // other fields...
}, { timestamps: true });

export const Recipe = model('Recipe', recipeSchema, 'Recipes');

