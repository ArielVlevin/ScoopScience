export const Recipe_Sort_Option: Record<
  string,
  { field: string; label: string }
> = {
  createdAt: { field: "createdAt", label: "Newest" },
  updatedAt: { field: "updatedAt", label: "Recently Updated" },
  ratingValue: { field: "recipeRating.ratingValue", label: "Top Rated" },
  ratingAmount: { field: "recipeRating.ratingAmount", label: "Most Rated" },
  recipeName: { field: "recipeData.recipeName", label: "Name (A-Z)" },
  recipeKind: { field: "recipeData.recipeKind", label: "Type" },
  prepTime: { field: "recipeData.prepTime", label: "Preparation Time" },
  cookingTime: { field: "recipeData.cookingTime", label: "Cooking Time" },
};

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
