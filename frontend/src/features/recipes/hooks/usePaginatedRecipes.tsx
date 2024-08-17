import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { useGetPaginatedRecipes } from "./useGetPaginatedRecipes";

type usePaginatedRecipesProps = {
  initialPage?: number;
  limit?: number;
};

export function usePaginatedRecipes({
  initialPage = 1,
  limit = 6,
}: usePaginatedRecipesProps) {
  const [page, setPage] = useState(initialPage);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

  const {
    recipes,
    totalPages,
    totalRecipes,
    currentPage,
    isLoading,
    isError,
    error,
  } = useGetPaginatedRecipes({
    page: page,
    limit: limit,
  });

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      setAllRecipes((prevRecipes) => [...prevRecipes, ...recipes]);
    }
  }, [recipes]);

  return {
    recipes: allRecipes,
    page: page,
    totalPages: totalPages,
    totalRecipes: totalRecipes,
    currentPage: currentPage,
    isLoading: isLoading,
    handleLoadMore: handleLoadMore,
    isError: isError,
    error: error,
  };
}
