import { useQueries } from "@tanstack/react-query";
import { fetchData } from "@/services/apiFunctions";
import { Recipe } from "@/types";

export function useGetRecipes(ids: number[]) {
  const queries = useQueries<Recipe[]>({
    queries: ids.map((_id) => ({
      queryKey: ["recipe", _id],
      queryFn: () => fetchData<Recipe>(`/recipes/id/${_id}`),
      enabled: _id > 0,
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const recipes = queries.map((query) => query.data) as Recipe[];

  return {
    recipes: recipes ?? ([] as Recipe[]),
    isLoading,
    isError,
    errors: queries.map((query) => query.error),
  };
}
