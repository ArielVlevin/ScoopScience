import { useQuery } from "@tanstack/react-query";
import { Ingredient, IngredientsArray } from "../../../types/ingredientTypes";
import { fetchData } from "../../../services/apiFunctions";

export default function useGetIngredient(ingredientId: string) {
  const endpoint = `ingredient/${ingredientId}`;
  const ingredientQuary = useQuery({
    queryKey: ["ingredients", ingredientId],
    queryFn: () => fetchData<Ingredient>(endpoint),
    enabled: !!ingredientId,
    refetchInterval: 2 * 60 * 1000, // refetch every 2 minutes
  });

  return {
    ingredientData: ingredientQuary.data as Ingredient,
    isLoading: ingredientQuary.isLoading,
    isError: ingredientQuary.isError,
    error: ingredientQuary.error,
  };
}

//TODO::: converte those 2 to 1 function

export function useGetIngredientsArray() {
  const endpoint = "ingredients/ingredientsArray";

  const ingredientsQuary = useQuery({
    queryKey: ["ingredientsArrayTotal"],
    queryFn: () => fetchData<IngredientsArray>(endpoint),
    refetchInterval: 2 * 60 * 1000, // refetch every 2 minutes
  });

  return {
    ingredientsByCategory: (ingredientsQuary.data as IngredientsArray) ?? {},
    isLoading: ingredientsQuary.isLoading,
    isError: ingredientsQuary.isError,
    error: ingredientsQuary.error,
  };
}

export function useGetIngredientsArray2(header: string, id?: string) {
  const endpoint = id ? `${header}/${id}` : "header";

  const ingredientsQuary = useQuery({
    queryKey: [header, id],
    queryFn: () => fetchData<Ingredient[]>(endpoint),
    refetchInterval: 2 * 60 * 1000, // refetch every 2 minutes
  });

  return {
    ingredients: (ingredientsQuary.data ?? []) as Ingredient[],
    isLoading: ingredientsQuary.isLoading,
    isError: ingredientsQuary.isError,
    error: ingredientsQuary.error,
  };
}
