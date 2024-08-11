import {
  RecipeRating,
  IngredientWithWeight,
  Totals,
  Allergies,
  RecipeKind,
} from "@/types";

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
