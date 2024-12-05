import { useQuery } from "@tanstack/react-query";
import { fetchIngredientsByCategory } from "../utils/fetchIngredients";

export const useFetchIngredientsByCategory = (limit: number) => {
  return useQuery({
    queryKey: ["ingredientsByCategory", limit],
    queryFn: () => fetchIngredientsByCategory(limit),
    staleTime: 5000,
  });
};
