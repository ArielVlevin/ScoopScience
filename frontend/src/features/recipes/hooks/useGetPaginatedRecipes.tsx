import { fetchData } from "@/services/apiFunctions";
import { Recipe } from "@/types";
import { useQuery } from "@tanstack/react-query";

type useGetPaginatedRecipesProps = {
  page?: number;
  limit?: number;
};

export function useGetPaginatedRecipes({
  page = 1,
  limit = 6,
}: useGetPaginatedRecipesProps) {
  const recipesQuary = useQuery({
    queryKey: ["recipes", page],
    queryFn: () =>
      fetchData<{
        recipes: Recipe[];
        totalPages: number;
        totalRecipes: number;
        currentPage: number;
      }>(`/recipes/paginated?page=${page}&limit=${limit}`),
  });

  return {
    recipes: recipesQuary.data?.recipes ?? [],
    totalPages: recipesQuary.data?.totalPages ?? 0,
    totalRecipes: recipesQuary.data?.totalRecipes ?? 0,
    currentPage: recipesQuary.data?.currentPage ?? 0,
    isLoading: recipesQuary.isLoading,
    isError: recipesQuary.isError,
    error: recipesQuary.error,
  };
}
