import { useForm } from "react-hook-form";
import { Ingredient, IngredientCategory } from "@/types";
import { IngredientFormFields } from "../components/IngredientFormFields";
import { useAddIngredient } from "../hooks/useAddngredient";
import { PlusIcon } from "@/components/icons/icon";
import CenteredContainer from "@/components/class/centeredContainer";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";

const AddIngredientForm = () => {
  const { control, handleSubmit } = useForm<Ingredient>({
    defaultValues: {
      name: "",
      category: "dairy" as IngredientCategory,
      calories: 0,
      fat: 0,
      protein: 0,
      totalSolids: 0,
      sugar: 0,
      msnf: 0,
    },
  });

  const addIngredientMutation = useAddIngredient();

  const onSubmit = (data: Ingredient) => {
    addIngredientMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenteredContainer>
        <IngredientFormFields control={control} />

        <FormControl>
          <Button type="submit">
            {<PlusIcon className="w-5 h-5" />}
            Add Ingredient
          </Button>
        </FormControl>
      </CenteredContainer>
    </form>
  );
};

export default AddIngredientForm;
