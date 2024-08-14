import { Allergies } from "@/types";
export type Ingredient = {
  _id: number;
  name: string;
  category: IngredientCategory;
  calories: number;
  sugar: number;
  fat: number;
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

export type IngredientWithWeight = Ingredient & {
  weight: number;
};

export type Row = IngredientWithWeight;

export type IngredientsArray = {
  [key: string]: { _id: string; name: string }[];
};
