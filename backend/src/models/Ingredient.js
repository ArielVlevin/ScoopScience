import { Schema, model } from "mongoose";

export const allergiesSchema = new Schema({
  milk: { type: Boolean, default: false },
  nuts: { type: Boolean, default: false },
  egg: { type: Boolean, default: false },
  soy: { type: Boolean, default: false },
  wheat: { type: Boolean, default: false },
});

const ingredientSchema = new Schema(
  {
    _id: { type: Number },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    calories: { type: Number, required: true },
    sugar: { type: Number, required: true },
    fat: { type: Number, required: true },
    saturates: { type: Number, required: true },

    fatLevel: { type: String },
    saturatesLevel: { type: String },
    sugarsLevel: { type: String },

    totalSolids: { type: Number, required: true },
    msnf: { type: Number, required: true },
    protein: { type: Number, required: true },
    allergies: { type: allergiesSchema, default: {} },
  },
  { timestamps: true }
);

ingredientSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Ingredient = model("Ingredient", ingredientSchema, "Ingredients");
