import { fetchData } from "@/services/apiFunctions";
import {
  FetchIngredientsByCategoryParams,
  FetchIngredientsParams,
  FetchIngredientsResponse,
  Ingredient,
} from "@/types";

export async function fetchIngredients(
  params: FetchIngredientsParams
): Promise<FetchIngredientsResponse> {
  const query = new URLSearchParams();

  if (params.namesOnly) query.append("limit", params.namesOnly.toString());

  if (params.limit) query.append("limit", params.limit.toString());
  if (params.page) query.append("page", params.page.toString());
  if (params.order) query.append("order", params.order);
  if (params.sortBy) query.append("sortBy", params.sortBy);
  if (params.category) query.append("category", params.category);
  if (params.minCalories)
    query.append("minCalories", params.minCalories.toString());
  if (params.maxCalories)
    query.append("maxCalories", params.maxCalories.toString());
  if (params.minSugar) query.append("minSugar", params.minSugar.toString());
  if (params.maxSugar) query.append("maxSugar", params.maxSugar.toString());
  if (params.minFat) query.append("minFat", params.minFat.toString());
  if (params.maxFat) query.append("maxFat", params.maxFat.toString());
  if (params.search) query.append("search", params.search);

  if (params.allergies) {
    Object.entries(params.allergies).forEach(([key, value]) => {
      if (value) query.append(`allergies.${key}`, "true");
    });
  }

  const endpoint = `/ingredients/fetchIngredients?${query.toString()}`;
  return fetchData<FetchIngredientsResponse>(endpoint);
}

export interface IngredientByCategory {
  _id: string; // Category name
  ingredients: Ingredient[] | { _id: string; name: string }[];
}

export async function fetchIngredientsByCategory(
  param: FetchIngredientsByCategoryParams
) {
  const endpoint = `/ingredients/fetchIngredientsByCategory?limit=${param.limit}&namesOnly=${param.namesOnly}`;
  return fetchData<IngredientByCategory[]>(endpoint);
}

export async function fetchIngredientCategories(): Promise<string[]> {
  const endpoint = `/ingredients/fetchCategories`;
  return fetchData<string[]>(endpoint);
}

export async function fetchIngredientById(
  ingredientId: string,
  weight: number = 100
): Promise<Ingredient> {
  const endpoint = `/ingredients/id/${ingredientId}?weight=${weight}`;
  return fetchData<Ingredient>(endpoint);
}
