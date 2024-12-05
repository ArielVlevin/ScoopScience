import { useQuery } from "@tanstack/react-query";
import { fetchRecipes, FetchRecipesResponse } from "../utils/fetchRecipes";
import queryClient from "@/config/query";
import { FetchRecipesParams } from "@/types";

export const useFetchRecipes = (params: FetchRecipesParams) => {
  const queryKey = ["recipes", params];

  return useQuery<FetchRecipesResponse, Error>({
    queryKey,
    queryFn: () => fetchRecipes(params),
    staleTime: 5000, // Cache the data for 5 seconds before refetching
    initialData: () => {
      const cachedData =
        queryClient.getQueryData<FetchRecipesResponse>(queryKey);

      return cachedData || undefined;
    },
    placeholderData: (previousData) => previousData,
  });
};
