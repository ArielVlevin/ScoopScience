import { fetchData } from "@/services/apiFunctions";
import { Recipe } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetRecipesByKind(recipeKind: string) {
  const recipesQuery = useQuery({
    queryKey: ["recipesByKind", recipeKind],
    queryFn: () => fetchData<Recipe[]>(`/recipes/kind/${recipeKind}`),
    enabled: !!recipeKind,
  });

  return {
    recipes: recipesQuery.data ?? ([] as Recipe[]),
    isLoading: recipesQuery.isLoading,
    isError: recipesQuery.isError,
    error: recipesQuery.error,
    refetch: recipesQuery.refetch,
  };
}
