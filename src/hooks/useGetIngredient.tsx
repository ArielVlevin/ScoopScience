
import getData, { getProps } from "../api/Get";
import { useQuery } from "@tanstack/react-query";
import { Ingredient, IngredientCategory, IngredientsArray } from "../Types/ingredient";



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





//TODO::: converte those 2 to 1 function
export function useGetIngredientsArray() {

  const ingredientsQuary = useQuery({
    queryKey: ['ingredientsArrayTotal'],
    queryFn: () => getData({ header: 'ingredientsArrayTotal' }),    
  })

  return{
    ingredientsByCategory: ingredientsQuary.data as IngredientsArray ?? {},
    isLoading: ingredientsQuary.isLoading,
    isError: ingredientsQuary.isError,
    error: ingredientsQuary.error, 
  };
};




export function useGetIngredientsArray2({header, id}: getProps) {

  const ingredientsQuary = useQuery({  
    queryKey: [header, id],
    queryFn: () => getData({ header, id}),
  });

  return{
    ingredients: (ingredientsQuary.data ?? []) as Ingredient[],
    isLoading: ingredientsQuary.isLoading,
    isError: ingredientsQuary.isError,
    error: ingredientsQuary.error, 
  };
};





