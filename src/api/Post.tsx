import axios from "axios";
import { Ingredient } from "../types/ingredient";
import { RecipeData } from "../types/recipe";


export async function postIngredient (data: Ingredient) {
   const { data: response } = await axios.post('http://localhost:3000/post/ingredients', data);
   return response.data;
   };




export async function postRecipe (data: RecipeData) {
  const { data: response } = await axios.post('http://localhost:3000/post/recipes', data);
  return response.data;
  };






