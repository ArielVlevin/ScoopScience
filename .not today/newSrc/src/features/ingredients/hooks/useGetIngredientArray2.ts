import { useFetchData } from "@/hooks/useFetchData";

export function useGetIngredientsArray2(header: string) {
  const endpoint = `ingredients/ingredientsArray/${header}`;

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
