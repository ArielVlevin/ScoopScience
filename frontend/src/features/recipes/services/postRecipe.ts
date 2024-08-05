import api from "@/config/api";
import { Recipe } from "@/types";

export async function postRecipe(data: Recipe, photo: File | null) {
  const formData = new FormData();

  formData.append("recipeData", JSON.stringify(data.recipeData));
  formData.append("recipeRating", JSON.stringify(data.recipeRating));
  formData.append("recipeIngredient", JSON.stringify(data.recipeIngredient));

  if (photo) {
    formData.append("photo", photo);
  }

  try {
    const response = await api.post("/recipes/post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting recipe:", error);
    throw error;
  }
}
