import { useMutation } from "@tanstack/react-query";
import { postRecipe } from "../services/recipeService";
import { RecipeData } from "@/types";

export function useCreateRecipe() {
  return useMutation({
    mutationFn: (data: RecipeData) => postRecipe(data),
    onSuccess: () => {
      // handle success, e.g., show a success message
    },
    onError: (error) => {
      console.error("Error creating recipe:", error);
    },
  });
}
