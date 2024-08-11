import { Schema, model } from "mongoose";
import { allergiesSchema } from "./Ingredient.js";

// Schema for ingredient with weight
const ingredientWithWeightSchema = new Schema({
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
  allergies: { type: allergiesSchema, default: {} },
  weight: { type: Number, required: true },
});

// Schema for totals
const totalsSchema = new Schema({
  totalWeight: { type: Number, required: true },
  totalCalories: { type: Number, required: true },
  totalSugar: { type: Number, required: true },
  totalSugarPercentage: { type: Number, required: true },
  totalFat: { type: Number, required: true },
  totalFatPercentage: { type: Number, required: true },
  totalSolidPercentage: { type: Number, required: true },
  totalMsnf: { type: Number, required: true },
});

// Enum for recipe types
const recipeKindEnum = ["gelato", "iceCream", "custard", "sorbet", "other"];

// Schema for ingredients
const ingredientsSchema = new Schema({
  recipeType: { type: String, enum: recipeKindEnum, required: true },
  ingredients: [ingredientWithWeightSchema],
  totalData: totalsSchema,
  allergies: { type: allergiesSchema, default: {} },
});

// Schema for recipe data
const recipeDataSchema = new Schema({
  recipeName: { type: String, required: true },
  recipeKind: { type: String, enum: recipeKindEnum, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  prepTime: { type: Number, required: true },
  photo: { type: String },
  isPublic: { type: Boolean, required: true },
});

// Schema for recipe rating
const recipeRatingSchema = new Schema({
  likes: { type: Number, required: true },
  ratingValue: { type: Number, required: true },
  ratingAmount: { type: Number, required: true },
});

// Main recipe schema
const recipeSchema = new Schema(
  {
    _id: { type: Number },
    recipeData: { type: recipeDataSchema, required: true },
    recipeRating: { type: recipeRatingSchema, required: true },
    recipeIngredient: { type: ingredientsSchema, required: true },
  },
  { timestamps: true }
);

export const Recipe = model("Recipe", recipeSchema, "Recipes");
