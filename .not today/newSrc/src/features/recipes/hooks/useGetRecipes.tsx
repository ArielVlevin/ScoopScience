import { fetchData } from "@/services/apiFunctions";
import { Recipe } from "@/types";
import { useQuery } from "../../../../../node_modules1/@tanstack/react-query/build/modern";

export function useGetRecipes() {
  const recipesQuary = useQuery({
    queryKey: ["recipesArrayTotal"],
    queryFn: () => fetchData<Recipe[]>("recipesArray"),
  });

  return {
    recipes: recipesQuary.data ?? [],
    isLoading: recipesQuary.isLoading,
    isError: recipesQuary.isError,
    error: recipesQuary.error,
  };
}
