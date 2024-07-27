import { RecipeData } from "@/types";
import { postData } from "@/services/apiFunctions";

export function postRecipe(data: RecipeData) {
  return postData<RecipeData>("recipes", data);
}
