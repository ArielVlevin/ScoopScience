import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
  DialogDescription,
} from "@/components/ui";
import { Ingredient, Row } from "@/types";
import { useFetchIngredient } from "@/features/ingredients/hooks/useFetchIngredient";
import { useFetchIngredientCategories } from "@/features/ingredients/hooks/useFetchCategories";
import { useFetchIngredients } from "@/features/ingredients/hooks/useFetchingredients";

function AddIngredientToTable({
  rows,
  setRows,
  isAddingIngredient,
  setIsAddingIngredient,
}: {
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  isAddingIngredient: boolean;
  setIsAddingIngredient: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
    null
  );
  const [weight, setWeight] = useState<number>(0);
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);

  const {
    data: ingredientsByCategory,
    isLoading,
    isError,
    error,
  } = useFetchIngredientCategories();

  const {
    data: ingredients,
    isLoading: isLoadingIngredients,
    isError: isErrorIngredients,
    error: errorIngredients,
  } = useFetchIngredients({
    category: category || undefined,
    limit: 0,
    namesOnly: true,
  });

  const categoryOptions = useMemo(
    () =>
      ingredientsByCategory?.map((category) => (
        <SelectItem key={category} value={category}>
          {category}
        </SelectItem>
      )) || [],
    [ingredientsByCategory]
  );

  const {
    data: FetchedIngredient,
    isLoading: isLoadingIngredient,
    isError: isErrorIngredient,
    error: errorIngredient,
  } = useFetchIngredient(selectedIngredient!, weight);

  useEffect(() => {
    if (FetchedIngredient && !isLoadingIngredient) {
      setIngredient(FetchedIngredient);
    }
  }, [FetchedIngredient, isLoadingIngredient]);

  const handleDialogClose = useCallback(() => {
    setCategory(null);
    setSelectedIngredient("");
    setWeight(0);
    setIngredient(null);
    setIsAddingIngredient(false);
  }, [setIsAddingIngredient]);

  const handleSaveNewRow = useCallback(() => {
    if (!ingredient || !rows) return;
    if (rows.some((row) => row._id === ingredient._id))
      return alert(
        `The ingredient "${ingredient.name}" already exists in the recipe.`
      );
    if (weight <= 0)
      return alert(
        `The ingredient "${ingredient.name}" must have a positive weight.`
      );

    if (isErrorIngredient && errorIngredient)
      return alert(`Error fetching ingredient: ${errorIngredient.message}`);

    const newIngredientRow = { ...ingredient };
    setRows([...rows, newIngredientRow]);
    handleDialogClose();
  }, [
    ingredient,
    rows,
    weight,
    isErrorIngredient,
    errorIngredient,
    setRows,
    handleDialogClose,
  ]);

  return (
    <Dialog
      open={isAddingIngredient}
      onOpenChange={(open) => {
        setIsAddingIngredient(open);
        if (!open) handleDialogClose();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-500 dark:bg-green-900 dark:hover:bg-green-700 text-white">
          Add Ingredient
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[400px] p-4"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Ingredient</DialogTitle>
          <DialogDescription>
            Please select a category, ingredient, and weight to add a new
            ingredient to the recipe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Label htmlFor="category">Category</Label>

          {isLoading ? (
            <div>Loading...</div>
          ) : isError && error ? (
            <div>{error.message}</div>
          ) : (
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>{categoryOptions}</SelectContent>
            </Select>
          )}

          {category ? (
            <>
              <Label htmlFor="ingredients">Ingredients</Label>
              {isLoadingIngredients ? (
                <div>Loading...</div>
              ) : isErrorIngredients && errorIngredients ? (
                <div>{errorIngredients.message}</div>
              ) : (
                <>
                  <Select onValueChange={setSelectedIngredient}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select ingredients" />
                    </SelectTrigger>
                    <SelectContent>
                      {ingredients?.ingredients.map((ingredient, index) => (
                        <SelectItem key={index} value={String(ingredient._id)}>
                          {ingredient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedIngredient && (
                    <>
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Enter weight"
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                      />
                    </>
                  )}
                </>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button onClick={handleSaveNewRow}>Add</Button>
              </DialogFooter>
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddIngredientToTable;
