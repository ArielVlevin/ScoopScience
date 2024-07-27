import { fetchData } from "@/services/apiFunctions";
import { RecipeData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetRecipes() {
  const recipesQuary = useQuery({
    queryKey: ["recipesArrayTotal"],
    queryFn: () => fetchData<RecipeData[]>("recipes/recipesArray"),
  });

  return {
    recipes: (recipesQuary.data as RecipeData[]) ?? [],
    isLoading: recipesQuary.isLoading,
    isError: recipesQuary.isError,
    error: recipesQuary.error,
  };
}
