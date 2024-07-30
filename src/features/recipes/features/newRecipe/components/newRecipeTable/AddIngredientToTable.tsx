import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { Ingredient, Row } from "@/types";
import { useGetIngredientsArray } from "@/features/ingredients/hooks/useGetIngredientArray";
import useGetIngredient from "@/features/ingredients/hooks/useGetIngredient";

function handleSaveNewRow(
  rows: Row[] | null,
  setRows: React.Dispatch<React.SetStateAction<Row[]>>,
  setIsAddingIngredient: React.Dispatch<React.SetStateAction<boolean>>,
  ingredientData: Ingredient | null,
  weight: number
) {
  if (ingredientData === null || rows === null) return;

  const existingIngredient = rows.find((row) => row._id === ingredientData._id);
  if (existingIngredient) {
    alert(
      `The ingredient "${ingredientData.name}" already exists in the recipe.`
    );
    return;
  }
  const newIngredientRow: Row = {
    name: ingredientData.name,
    category: ingredientData.category,
    _id: ingredientData._id,
    sugar: ingredientData.sugar,
    fat: ingredientData.fat,
    protein: ingredientData.protein,
    totalSolids: ingredientData.totalSolids,
    msnf: ingredientData.msnf,
    calories: ingredientData.calories,
    weight: weight,
  };

  setIsAddingIngredient(false);
  setRows([...rows, newIngredientRow]);
}

type AddRowProps = {
  rows: Row[] | null;
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  isAddingIngredient: boolean;
  setIsAddingIngredient: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddIngredientToTable({
  rows,
  setRows,
  isAddingIngredient,
  setIsAddingIngredient,
}: AddRowProps) {
  const [category, setCategory] = React.useState<string>("");
  const [selectedIngredient, setSelectedIngredient] =
    React.useState<string>("");
  const [weight, setWeight] = React.useState<number>(100);
  const [ingredient, setIngredient] = React.useState<Ingredient | null>(null);

  const { ingredientsByCategory } = useGetIngredientsArray();
  const { ingredientData } = useGetIngredient(selectedIngredient);

  useEffect(() => {
    setIngredient(ingredientData);
  }, [selectedIngredient, ingredientData]);

  return (
    <>
      <Dialog open={isAddingIngredient} onOpenChange={setIsAddingIngredient}>
        <DialogTrigger asChild>
          <Button type="button" className="w-1/6">
            Add Ingredient
          </Button>
        </DialogTrigger>
        <DialogContent
          className="w-[400px] p-4"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Add Ingredient</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-foreground">
                Category
              </Label>
              <Select onValueChange={(e) => setCategory(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(ingredientsByCategory).map((categoryKey) => (
                    <SelectItem key={categoryKey} value={categoryKey}>
                      {categoryKey}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {category && (
              <div>
                <div className="grid gap-2">
                  <Label htmlFor="ingredients" className="text-foreground">
                    Ingredients
                  </Label>
                  <Select onValueChange={(e) => setSelectedIngredient(e)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select ingredients" />
                    </SelectTrigger>

                    <SelectContent>
                      {ingredientsByCategory[category].map(
                        (ingredient, index) => (
                          <SelectItem key={index} value={ingredient.id}>
                            {ingredient.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2 mt-4 mb-4">
                  <Label htmlFor="weight" className="text-foreground">
                    Weight
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter weight"
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingIngredient(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      handleSaveNewRow(
                        rows,
                        setRows,
                        setIsAddingIngredient,
                        ingredient,
                        weight
                      )
                    }
                  >
                    Add
                  </Button>
                </DialogFooter>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
