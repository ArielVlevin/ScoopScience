import { Ingredient } from "@/types";

export interface FetchIngredientResponse {
  ingredient: Ingredient;
}

export interface FetchIngredientsResponse {
  ingredients: Ingredient[] | { _id: string; name: string }[];
  totalIngredients: number;
  currentPage: number;
  totalPages: number;
}

export interface FetchIngredientsParams {
  limit?: number;
  page?: number;
  order?: "asc" | "desc";
  sortBy?: "name" | "category" | "calories" | "sugar" | "fat";
  namesOnly?: boolean;
  category?: string;
  minCalories?: number;
  maxCalories?: number;
  minSugar?: number;
  maxSugar?: number;
  minFat?: number;
  maxFat?: number;
  search?: string;
  allergies?: Partial<
    Record<"milk" | "nuts" | "egg" | "soy" | "wheat", boolean>
  >;
}

export interface FetchIngredientsByCategoryParams {
  limit?: number;
  namesOnly?: boolean;
}
