
import getData from "../api/Get";
import { useQuery } from "@tanstack/react-query";

const useGetIngredient = (ingredientId: string) => {

  const ingredientQuary = useQuery({
    queryKey: ['ingredients', ingredientId],
    queryFn: () => getData({ header: 'ingredients', id: ingredientId }),    
  })

  return{
    ingredientData: ingredientQuary.data,
    isLoading: ingredientQuary.isLoading,
    isError: ingredientQuary.isError,
    error: ingredientQuary.error,
  };
};

export default useGetIngredient;
