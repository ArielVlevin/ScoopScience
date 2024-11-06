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
import { useGetIngredientsArray } from "@/features/ingredients/hooks/useGetIngredientArray";
import useGetIngredient from "@/features/ingredients/hooks/useGetIngredient";

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
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);

  const { ingredientsByCategory } = useGetIngredientsArray();
  const { ingredientData } = useGetIngredient(selectedIngredient);

  useEffect(() => {
    if (selectedIngredient) setIngredient(ingredientData);
  }, [selectedIngredient, ingredientData]);

  const handleDialogClose = useCallback(() => {
    setCategory(null);
    setSelectedIngredient("");
    setWeight(0);
    setIngredient(null);
    setIsAddingIngredient(false);
  }, [setIsAddingIngredient]);

  const handleSaveNewRow = useCallback(() => {
    if (!ingredient || !rows) return;
    if (rows.some((row) => row._id === ingredient._id)) {
      return alert(
        `The ingredient "${ingredient.name}" already exists in the recipe.`
      );
    }
    if (weight <= 0) {
      return alert(
        `The ingredient "${ingredient.name}" must have a positive weight.`
      );
    }
    const newIngredientRow = { ...ingredient, weight };
    setRows([...rows, newIngredientRow]);
    handleDialogClose();
  }, [ingredient, rows, weight, setRows, handleDialogClose]);

  const categoryOptions = useMemo(
    () =>
      Object.keys(ingredientsByCategory).map((categoryKey) => (
        <SelectItem key={categoryKey} value={categoryKey}>
          {categoryKey}
        </SelectItem>
      )),
    [ingredientsByCategory]
  );

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
          <Select onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>{categoryOptions}</SelectContent>
          </Select>
          {category ? (
            <>
              <Label htmlFor="ingredients">Ingredients</Label>
              <Select onValueChange={setSelectedIngredient}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select ingredients" />
                </SelectTrigger>
                <SelectContent>
                  {ingredientsByCategory[category].map((ingredient, index) => (
                    <SelectItem key={index} value={ingredient._id}>
                      {ingredient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {ingredient ? (
                <>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight"
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                  />
                </>
              ) : null}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleDialogClose();
                  }}
                >
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
