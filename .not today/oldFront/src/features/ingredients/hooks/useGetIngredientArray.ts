import { IngredientsArray } from "@/types";
import { useFetchData } from "@/hooks/useFetchData";

export function useGetIngredientsArray() {
  const endpoint = "ingredients/ingredientsArray";
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
