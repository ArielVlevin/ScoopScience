import api from "@/config/api";
import { Recipe } from "@/types";

///post
export async function postRecipe(data: Recipe, photo: File | null) {
  const formData = new FormData();

  formData.append("recipeData", JSON.stringify(data.recipeData));
  formData.append("recipeRating", JSON.stringify(data.recipeRating));
  formData.append("recipeIngredient", JSON.stringify(data.recipeIngredient));
  formData.append("user_id", JSON.stringify(data.user_id));

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

//update
interface RecipeData {
  recipeName: string;
  description: string;
  instructions: string;
}

export const updateRecipe = async (
  id: number,
  recipeData: RecipeData,
  photoFile?: File | null
) => {
  const formData = new FormData();
  formData.append("recipeData", JSON.stringify(recipeData));

  if (photoFile) {
    formData.append("photo", photoFile);
  }

  try {
    const response = await api.put(`/recipes/id/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

///delete
export async function deleteRecipe(recipeId: number): Promise<void> {
  try {
    const response = await api.delete(`/recipes/id/${recipeId}`);
    console.log("Recipe deleted:", response.data);
  } catch (error) {
    console.error("Failed to delete recipe:", error);
    throw error;
  }
}
