import { IngredientsArray } from "@/types";
import { useFetchData } from "@/hooks/useFetchData";

export function useGetIngredientsArray() {
  const endpoint = "ingredients/getAll";
  const {
    data: ingredientsByCategory,
    isLoading,
    isError,
    error,
  } = useFetchData<IngredientsArray>(["ingredientsArrayTotal"], endpoint);

  return {
    ingredientsByCategory,
    isLoading,
    isError,
    error,
  };
}
