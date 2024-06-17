
import getData from "../api/Get";
import { useQuery } from "@tanstack/react-query";
import { Ingredient, IngredientsArray } from "../Types/ingredient";



 export default function useGetIngredient (ingredientId: string | null) {
   

  const ingredientQuary = useQuery({
    queryKey: ['ingredients', ingredientId],
    queryFn: () => getData({ header: 'ingredients', id: ingredientId! }),
    enabled: !!ingredientId,
  })


  //TODO::::maybe need remove the .json()
  return{
    ingredientData: ingredientQuary.data as Ingredient,    
    isLoading: ingredientQuary.isLoading,
    isError: ingredientQuary.isError,
    error: ingredientQuary.error,
  };

};



export function useGetIngredientsArray() {

  const ingredientsQuary = useQuery({
    queryKey: ['ingredientsArray'],
    queryFn: () => getData({ header: 'ingredientsArray' }),    
  })

  return{
    ingredientsByCategory: ingredientsQuary.data as IngredientsArray ?? {},
    isLoading: ingredientsQuary.isLoading,
    isError: ingredientsQuary.isError,
    error: ingredientsQuary.error, 
  };
};





