
import getData, { getProps } from "../api/Get";
import { useQuery } from "@tanstack/react-query";
import { Ingredient, IngredientsArray } from "../Types/ingredient";
import { RecipeData } from "../Types/recipe";



 export default function useGetIngredient (ingredientId: string | null) {
   

  const ingredientQuary = useQuery({
    queryKey: ['ingredients', ingredientId],
    queryFn: () => getData({ header: 'ingredient', id: ingredientId! }),
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



export function useGetRecipes() {

  const recipesQuary = useQuery({
    queryKey: ['recipesArrayTotal'],
    queryFn: () => getData({ header: 'recipes/recipesArray' }),    
  })

  return{
    recipes: (recipesQuary.data as RecipeData[]) ?? [],
    isLoading: recipesQuary.isLoading,
    isError: recipesQuary.isError,
    error: recipesQuary.error, 
  };
};







//TODO::: converte those 2 to 1 function
export function useGetIngredientsArray() {

  const ingredientsQuary = useQuery({
    queryKey: ['ingredientsArrayTotal'],
    queryFn: () => getData({ header: 'ingredients/ingredientsArray' }),    
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





