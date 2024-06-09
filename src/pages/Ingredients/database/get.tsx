import { useEffect, useState } from "react";
import { Ingredient } from "../../../Types/ingredient";
import { Http } from '../../../database/Http';

const GetIngredient = (ingredientId: string) => {
   const [ingredient, setIngredient] = useState<Ingredient | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   useEffect(() => {
     const fetchIngredient = async () => {
       try {
         setIsLoading(true);
         const data = await Http({ header: 'ingredients', id: ingredientId , method: 'GET' });
         setIngredient(data);
         setIsLoading(false);
       } catch (err: Error  | any) {
         setError(err.message);
         setIsLoading(false);
       }
     };
 
     fetchIngredient();
   }, [ingredientId]);
 
   return { ingredient, isLoading, error };
};

export default GetIngredient;
   
