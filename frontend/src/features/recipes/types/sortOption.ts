export const SORT_OPTIONS: Record<string, { field: string; label: string }> = {
  createdAt: { field: "createdAt", label: "Newest" },
  updatedAt: { field: "updatedAt", label: "Recently Updated" },
  ratingValue: { field: "recipeRating.ratingValue", label: "Top Rated" },
  ratingAmount: { field: "recipeRating.ratingAmount", label: "Most Rated" },
  recipeName: { field: "recipeData.recipeName", label: "Name (A-Z)" },
  recipeKind: { field: "recipeData.recipeKind", label: "Type" },
  prepTime: { field: "recipeData.prepTime", label: "Preparation Time" },
  cookingTime: { field: "recipeData.cookingTime", label: "Cooking Time" },
};
