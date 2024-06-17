import axios from "axios";
import { Ingredient } from "../Types/ingredient";
import { RecipeData } from "../Types/recipe";


export async function postIngredient (data: Ingredient) {
   const { data: response } = await axios.post('http://localhost:3000/ingredients', data);
   return response.data;
   };




export async function postRecipe (data: RecipeData) {
  const { data: response } = await axios.post('http://localhost:3000/recipes', data);
  return response.data;
  };






