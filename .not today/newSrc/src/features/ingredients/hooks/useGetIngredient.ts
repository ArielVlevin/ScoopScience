import { Ingredient } from "@/types/ingredientTypes";
import { useFetchData } from "@/hooks/useFetchData";

export default function useGetIngredient(ingredientId: string | undefined) {
  const endpoint = ingredientId ? `ingredient/${ingredientId}` : undefined;
  const {
    data: ingredientData,
    isLoading,
    isError,
    error,
  } = useFetchData<Ingredient>(["ingredients", ingredientId], endpoint);

  return {
    ingredientData,
    isLoading,
    isError,
    error,
  };
}
