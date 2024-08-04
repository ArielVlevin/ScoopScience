import { fetchData } from "@/services/apiFunctions";
import { Recipe } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetRecipes() {
  const recipesQuary = useQuery({
    queryKey: ["recipesArrayTotal"],
    queryFn: () => fetchData<Recipe[]>("/recipes/recipesArray"),
  });

  return {
    recipes: recipesQuary.data ?? [],
    isLoading: recipesQuary.isLoading,
    isError: recipesQuary.isError,
    error: recipesQuary.error,
  };
}
