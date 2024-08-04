import {
  useMutation,
  useQueryClient,
} from "../../../../../node_modules1/@tanstack/react-query/build/modern";
import { useNavigate } from "../../../../../node_modules1/react-router-dom/dist";
import { postIngredient } from "../services/ingredientService";

export function useAddIngredient() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postIngredient,
    onSuccess: (data) => {
      queryClient.setQueryData(["ingredients", data._id], data);
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      alert(`Ingredient ${data.name} added successfully!`);
      navigate(`/ingredients/${data._id}`);
    },
    onError: (error) => {
      alert(`Error adding ingredient: ${error.message}`);
    },
  });
}
