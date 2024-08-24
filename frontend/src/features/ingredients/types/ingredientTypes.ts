import { Allergies } from "@/types";

export type Level = "High" | "Medium" | "Low";

export type Ingredient = {
  _id?: number;
  name: string;
  weight: number;
  category: IngredientCategory;
  calories: number;
  sugar: number;
  fat: number;
  saturates: number;
  protein: number;
  totalSolids: number;
  msnf: number;
  allergies: Allergies;

  fatLevel?: Level;
  saturatesLevel?: Level;
  sugarsLevel?: Level;

  createdAt?: Date;
  updatedAt?: Date;
};

export type Row = Ingredient;

export type NewIngredient = {
  name: string;
  weight: number;
  category: IngredientCategory;
  calories: number;
  sugar: number;
  fat: number;
  saturates: number;
  protein: number;
  totalSolids: number;
  msnf: number;
  allergies: Allergies;
};

export const ingredientCategoryArray = [
  "dairy",
  "sugars",
  "stabilizer",
  "fruits",
  "adding",
  "nuts",
  "liquid",
  "other",
] as const;

export type IngredientCategory = (typeof ingredientCategoryArray)[number]; // = 'dairy' | 'sugars' | 'stabilizer' | 'fruits' | 'adding'| 'nuts';

export type IngredientsArray = {
  [key: string]: { _id: string; name: string }[];
};
