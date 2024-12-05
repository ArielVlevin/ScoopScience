import { useState } from "react";

export const useIngredientDialog = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (ingredient: string) => {
    setSelectedIngredient(ingredient);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedIngredient("");
    setIsDialogOpen(false);
  };

  return { selectedIngredient, isDialogOpen, openDialog, closeDialog };
};
