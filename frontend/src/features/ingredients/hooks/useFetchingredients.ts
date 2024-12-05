import { useQuery } from "@tanstack/react-query";
import queryClient from "@/config/query";
import { FetchIngredientsParams, FetchIngredientsResponse } from "@/types";
import { fetchIngredients } from "../utils/fetchIngredients";

export const useFetchIngredients = (params: FetchIngredientsParams) => {
  const queryKey = ["ingredients", params];

  return useQuery<FetchIngredientsResponse, Error>({
    queryKey,
    queryFn: () => fetchIngredients(params),
    staleTime: 5000, // Cache the data for 5 seconds before refetching
    initialData: () => {
      const cachedData =
        queryClient.getQueryData<FetchIngredientsResponse>(queryKey);

      return cachedData || undefined;
    },
    placeholderData: (previousData) => previousData,
  });
};
