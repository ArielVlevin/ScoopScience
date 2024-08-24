import { Ingredient, NewIngredient } from "@/types";
import { postData } from "@/services/apiFunctions";

export function postIngredient(data: NewIngredient) {
  return postData<Ingredient>("/ingredients/post", data);
}
