import { Schema, model } from "mongoose";

const ingredientSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

export const Ingredient = model("Ingredient", ingredientSchema, "Ingredients");
