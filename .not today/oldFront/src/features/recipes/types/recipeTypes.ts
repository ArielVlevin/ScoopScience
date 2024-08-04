import { Totals } from "@/features/recipes/types/totalsTypes";
import { IngredientWithWeight } from "../../../types/ingredientTypes";
import { RecipeRating } from "./recipeRating";
import { SpecialMarks } from "./specialMarks";

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
  specialMarks: SpecialMarks;
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
  _id?: number;
  recipeData: RecipeData;
  recipeRating: RecipeRating;
  recipeIngredient: Ingredients;
};

//TODO:: add user when login exists
//user: User,
