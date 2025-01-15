import { Ingredient } from "@/features/ingredients/types/ingredientTypes";
import { useFetchData } from "@/hooks/useFetchData";

export default function useGetIngredient(ingredientId: string | undefined) {
  const endpoint = ingredientId ? `ingredients/id/${ingredientId}` : undefined;
  const {
    data: ingredientData,
    isLoading,
    isError,
    error,
  } = useFetchData<Ingredient>(["ingredients", ingredientId!], endpoint);

  return {
    ingredientData,
    isLoading,
    isError,
    error,
  };
}

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
