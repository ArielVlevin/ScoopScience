import { fetchData } from "@/services/apiFunctions";
import { Recipe } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetRecipe(_id: string) {
  const recipesQuary = useQuery({
    queryKey: ["recipes", _id],
    queryFn: () => fetchData<Recipe>(`/recipes/id/${_id}`),
  });

  return {
    recipe: recipesQuary.data ?? ({} as Recipe),
    isLoading: recipesQuary.isLoading,
    isError: recipesQuary.isError,
    error: recipesQuary.error,
  };
}
