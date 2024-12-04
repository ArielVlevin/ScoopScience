import { fetchData } from "@/services/apiFunctions";
import { Recipe, SORT_OPTIONS } from "@/types";
export interface FetchRecipesResponse {
  recipes: Recipe[];
  totalRecipes: number;
  currentPage: number;
  totalPages: number;
}

export interface FetchRecipesParams {
  limit?: number;
  page?: number;
  order?: "asc" | "desc";
  sortBy?: string;
  recipeKind?: string;
  minRating?: number;
  maxRating?: number;
  search?: string;
  userId?: string;
}

export async function fetchRecipes(
  params: FetchRecipesParams
): Promise<FetchRecipesResponse> {
  const query = new URLSearchParams();

  if (params.limit) query.append("limit", params.limit.toString());
  if (params.page) query.append("page", params.page.toString());
  if (params.order) query.append("order", params.order);
  if (params.sortBy) query.append("sortBy", SORT_OPTIONS[params.sortBy].field);
  if (params.userId) query.append("userId", params.userId);
  if (params.recipeKind) query.append("recipeKind", params.recipeKind);
  if (params.minRating) query.append("minRating", params.minRating.toString());
  if (params.maxRating) query.append("maxRating", params.maxRating.toString());
  if (params.search) query.append("search", params.search);

  const endpoint = `/recipes/fetchRecipes?${query.toString()}`;
  return fetchData<FetchRecipesResponse>(endpoint);
}
