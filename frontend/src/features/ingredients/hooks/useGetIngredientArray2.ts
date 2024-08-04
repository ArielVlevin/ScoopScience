import { useFetchData } from "@/hooks/useFetchData";
import { Ingredient } from "@/types";

export function useGetIngredientsArray2(recipe: string) {
  const endpoint = `ingredients/recipe/${recipe}`;

  const {
    data: ingredients,
    isLoading,
    isError,
    error,
  } = useFetchData<Ingredient[]>(["ingredients"], endpoint);

  return {
    ingredients,
    isLoading,
    isError,
    error,
  };
}
