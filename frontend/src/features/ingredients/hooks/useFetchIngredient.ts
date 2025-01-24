import { useQuery } from "@tanstack/react-query";
import { Ingredient } from "@/types";
import { fetchIngredientById } from "../utils/fetchIngredients";

export const useFetchIngredient = (ingredientId: string, weight: number) => {
  return useQuery<Ingredient, Error>({
    queryKey: ["ingredient", ingredientId, weight],
    queryFn: () => fetchIngredientById(ingredientId, weight || 100),
    enabled: Boolean(ingredientId) && weight > 0,
    staleTime: 60000, // Cache the data for 1 minute
    placeholderData: undefined, // No placeholder data
  });
};
