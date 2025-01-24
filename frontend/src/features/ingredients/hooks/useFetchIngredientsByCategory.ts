import { useQuery } from "@tanstack/react-query";
import { fetchIngredientsByCategory } from "../utils/fetchIngredients";
import { FetchIngredientsByCategoryParams } from "@/types";

export const useFetchIngredientsByCategory = (
  param: FetchIngredientsByCategoryParams
) => {
  return useQuery({
    queryKey: ["ingredientsByCategory", param.limit],
    queryFn: () => fetchIngredientsByCategory(param),
    staleTime: 5000,
  });
};
