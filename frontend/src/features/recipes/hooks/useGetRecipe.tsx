import { fetchData } from "@/services/apiFunctions";
import { Recipe } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGetRecipe(_id: number) {
  const recipesQuary = useQuery({
    queryKey: ["recipes", _id],
    queryFn: () => fetchData<Recipe>(`/recipes/id/${_id}`),
    enabled: !!_id && _id > 0,
  });

  return {
    recipe: recipesQuary.data ?? ({} as Recipe),
    isLoading: recipesQuary.isLoading,
    isError: recipesQuary.isError,
    error: recipesQuary.error,
  };
}
