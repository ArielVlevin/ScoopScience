import { useMutation } from "../../../../../../../node_modules1/@tanstack/react-query/build/modern";
import { postRecipe } from "../../../services/recipeService";
import { Recipe } from "@/types";

export function useCreateRecipe() {
  return useMutation({
    mutationFn: (data: Recipe) => postRecipe(data),
    onSuccess: () => {
      // handle success, e.g., show a success message
    },
    onError: (error) => {
      console.error("Error creating recipe:", error);
    },
  });
}
