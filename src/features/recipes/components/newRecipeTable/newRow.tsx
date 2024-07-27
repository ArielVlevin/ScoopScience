import { TableRow, TableCell } from "@/components/ui/table";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@/components/icons/icon";
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

export default function AddRow({
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
    // get the ingredient from backend
    setIngredient(ingredientData);
  }, [selectedIngredient, ingredientData]);

  return (
    <TableRow>
      <TableCell className="text-center" colSpan={9}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Popover
                open={isAddingIngredient}
                onOpenChange={setIsAddingIngredient}
              >
                <PopoverTrigger>
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add row</span>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-4 grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category" className="text-foreground">
                      Category
                    </Label>
                    <Select onValueChange={(e) => setCategory(e)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(ingredientsByCategory).map(
                          (categoryKey) => (
                            <SelectItem key={categoryKey} value={categoryKey}>
                              {categoryKey}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {category && (
                    <div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor="ingredients"
                          className="text-foreground"
                        >
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

                      <div className="grid gap-2 mt-4">
                        <Label htmlFor="weight" className="text-foreground">
                          Weight
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Enter weight"
                          onChange={(e) =>
                            setWeight(parseFloat(e.target.value))
                          }
                        />
                      </div>

                      <div className="flex justify-end gap-4 mt-4 ">
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
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add new ingredient</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  );
}
