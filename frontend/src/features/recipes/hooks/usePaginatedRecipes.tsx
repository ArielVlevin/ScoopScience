import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { useGetPaginatedRecipes } from "./useGetPaginatedRecipes";

type usePaginatedRecipesProps = {
  type?: string;
  initialPage?: number;
  limit?: number;
  order?: "asc" | "desc";
};

export function usePaginatedRecipes({
  type,
  initialPage = 1,
  limit = 6,
  order,
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
    type: type,
    page: page,
    limit: limit,
    order: order,
  });

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleBack = () => {
    setPage((prevPage) => prevPage - 1 || 1);
  };

  const handleSetPage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
    else setPage(1);
  };

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      //setAllRecipes((prevRecipes) => [...prevRecipes, ...recipes]);
      setAllRecipes(recipes);
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
    handleBack: handleBack,
    handleSetPage: handleSetPage,
    isError: isError,
    error: error,
  };
}
