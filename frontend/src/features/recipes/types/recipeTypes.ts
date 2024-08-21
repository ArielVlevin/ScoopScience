import {
  RecipeRating,
  IngredientWithWeight,
  Totals,
  Allergies,
  Row,
} from "@/types";

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

//CHANGE TO NEWRECIPE AND RECIPE
export type Recipe = {
  user_id?: {
    _id?: number;
    username?: string;
  };
  _id?: number;
  recipeData: RecipeData;
  recipeRating: RecipeRating;
  recipeIngredient: Ingredients;
};

export type ExistingRecipe = Recipe & {
  createdAt: Date;
};

export type RecipeFormData = {
  name: string;
  description: string;
  recipeKind: RecipeKind;
  instructions: string;
  cookingTime: string;
  prepTime: string;
  image: string;
  isPublic: boolean;
  ingredients?: Row[];
  totals?: Totals;
  allergies?: Allergies;
};

export type RecipeFormState = {
  formData: RecipeFormData;
  rows: Row[];
  totals: Totals;
  currentStep: number;
};
