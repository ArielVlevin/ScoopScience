import { useFetchData } from "@/hooks/useFetchData";
import { Ingredient } from "@/types";

export function useGetIngredientOpenFoodApi(query: string | undefined) {
  const endpoint = query ? `ingredients/openFoodApi/${query}` : undefined;
  const {
    data: ingredientData,
    isLoading,
    isError,
    error,
  } = useFetchData<Ingredient>(["ingredients", query!], endpoint);

  return {
    ingredientData,
    isLoading,
    isError,
    error,
  };
}
