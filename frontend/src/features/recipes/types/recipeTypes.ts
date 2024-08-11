import { RecipeRating, IngredientWithWeight, Totals, Allergies } from "@/types";

export const typeOptions = [
  "gelato",
  "iceCream",
  "custard",
  "sorbet",
  "other",
] as const;
export type RecipeKind = (typeof typeOptions)[number]; // = 'gelato' | 'iceCream' | 'sorbet' | 'other';

export type Ingredients = {
  recipeType: RecipeKind;
  ingredients: IngredientWithWeight[];
  totalData: Totals;
  allergies: Allergies;
};

export type RecipeData = {
  recipeName: string;
  recipeKind: RecipeKind;
  description: string;
  instructions: string;
  cookingTime: number;
  prepTime: number;
  photo?: string;
  isPublic: boolean;
};

export type Recipe = {
  user_id?: number;
  _id?: number;
  recipeData: RecipeData;
  recipeRating: RecipeRating;
  recipeIngredient: Ingredients;
};
