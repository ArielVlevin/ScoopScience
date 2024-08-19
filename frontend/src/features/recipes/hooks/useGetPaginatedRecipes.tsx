import queryClient from "@/config/query";
import { fetchData } from "@/services/apiFunctions";
import { Recipe } from "@/types";
import { useQuery } from "@tanstack/react-query";

type useGetPaginatedRecipesProps = {
  type?: string;
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
};

export function useGetPaginatedRecipes({
  type = "paginated",
  page = 1,
  limit = 6,
  order,
}: useGetPaginatedRecipesProps) {
  const recipesQuary = useQuery({
    queryKey: ["recipes", type, page, limit, order],
    queryFn: () =>
      fetchData<{
        recipes: Recipe[];
        totalPages: number;
        totalRecipes: number;
        currentPage: number;
      }>(
        `/recipes/${type}?page=${page}&limit=${limit}${
          order ? `&order=${order}` : ""
        }`
      ),
  });

  const invalidateAllRecipesQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["recipes"] });
  };

  return {
    recipes: recipesQuary.data?.recipes ?? [],
    totalPages: recipesQuary.data?.totalPages ?? 0,
    totalRecipes: recipesQuary.data?.totalRecipes ?? 0,
    currentPage: recipesQuary.data?.currentPage ?? 0,
    isLoading: recipesQuary.isLoading,
    isError: recipesQuary.isError,
    error: recipesQuary.error,
    invalidateAllRecipesQueries,
  };
}
