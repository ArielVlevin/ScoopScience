import { useQuery } from "@tanstack/react-query";
import { fetchIngredientCategories } from "../utils/fetchIngredients";

export const useFetchIngredientCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["ingredientCategories"],
    queryFn: fetchIngredientCategories,
    staleTime: 60000, // Cache for 1 minute
    placeholderData: [], // Empty array until data is loaded
  });
};
