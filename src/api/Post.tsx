import axios from "axios";
import { Ingredient } from "../Types/ingredient";


export async function postIngredient (data: Ingredient) {
   const { data: response } = await axios.post('http://localhost:3000/ingredients', data);
   return response.data;
   };




/*
export const PostIngredient = async (ingredient: any): Promise<any> => {
   const response = await fetch('http://localhost:3000/ingredients', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(ingredient),
   });
 
   if (!response.ok) {
     throw new Error('Failed to post ingredient');
   }
 
   return response.json();
 };
 */
 
 