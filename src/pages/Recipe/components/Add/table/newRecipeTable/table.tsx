/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ingredient, Row } from "@/Types/ingredient";
import { NewRecipeTableAddIngredientRow } from "./newRow";
import { NewRecipeTableCells, NewRecipeTableHeads } from "./tableSetUp";
import TotalsCard, { calculateTotals } from "./totalsCard"; // Import the new component
import { FilePenIcon, TrashIcon } from "@/components/icons/icon";
import { roundToTwoDecimalPlaces } from "@/hooks/math";
import { useGetIngredientsArray2 } from "@/hooks/useGetIngredient";
import { RecipeKind } from "@/Types/recipe";
import { recipeValues } from "@/Types/globalVar";

type NewRecipeTableProops = {
  className?: string;
};


export default function NewRecipeTable({ className }: NewRecipeTableProops) {



  const [rows, setRows] = useState<Row[]>([]);

  const [newWeight, setNewWeight] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [isAddingIngredient, setIsAddingIngredient] = useState<boolean>(false);
  const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false);

  const [totals, setTotals] = useState(calculateTotals(rows));
  const [newTotalWeight, setNewTotalWeight] = useState<number>(totals.totalWeight);
  const [editTotalWeight, setEditTotalWeight] = useState<boolean>(false);



  const handleSaveNewRow = (ingredientData: Ingredient | null, weight: number) => {

    if(ingredientData === null) return;    

    const existingIngredient = rows.find((row) => row.id === ingredientData.id);
    if (existingIngredient) {
      alert(`The ingredient "${ingredientData.name}" already exists in the recipe.`);
      return;
    }
    const newIngredientRow: Row = {
      name: ingredientData.name,
      category: ingredientData.category,
      id: ingredientData.id,
      weight: weight,
      sugar: ingredientData.sugar,
      fat: ingredientData.fat,
      protein: ingredientData.protein,
      totalSolids: ingredientData.totalSolids,
      msnf: ingredientData.msnf,
      calories: ingredientData.calories
    };

    setRows([...rows, newIngredientRow]);

    setIsAddingIngredient(false); // Close the popover after saving the row
  };


  const [typeFilter, setTypeFilter] = useState<RecipeKind>('gelato');

  const { ingredients, isLoading, isError, error } = useGetIngredientsArray2({ header: 'ingredients/ingredientsArray', id: typeFilter });



  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      const newRows = ingredients.map((ingredient: Ingredient) => ({
      ...ingredient,
      weight: recipeValues.defaultWeightRecipe,
    }));
    setRows(newRows);
    }
  }, [ingredients, typeFilter]);




  useEffect(() => {
    setTotals(calculateTotals(rows));
  }, [rows]);

  const handleRowSelect = (row: Row) => {
    setSelectedRow(row);
  };

  const handleEditWeight = () => {
    setIsEditingWeight(true);
  };

  const handleClose = () => {
    setIsEditingWeight(false);
    setSelectedRow(null);
  };

  const handleSaveEdit = () => {
    if (newWeight > 0)
      setRows(
        rows.map((row) =>
          row.id === selectedRow?.id
            ? {
                ...row,
                weight: roundToTwoDecimalPlaces(newWeight),
              }
            : row
        )
      );
    else alert("Please enter a valid value greater than 0 grams");
    handleClose();
  };

  const handleDelete = () => {
    setRows(rows.filter((row) => row.id !== selectedRow?.id));
    setSelectedRow(null);
  };

 

  const handleSaveEditTotalWeight = () => {
    if (newTotalWeight >= 1)
      setRows(
        rows.map((row) => ({
          ...row,
          weight: roundToTwoDecimalPlaces((row.weight / totals.totalWeight) * newTotalWeight),
          calories: roundToTwoDecimalPlaces((row.calories / totals.totalWeight) * newTotalWeight),
          sugar: roundToTwoDecimalPlaces((row.sugar / totals.totalWeight) * newTotalWeight),
          fat: roundToTwoDecimalPlaces((row.fat / totals.totalWeight) * newTotalWeight),
          protein: roundToTwoDecimalPlaces((row.protein / totals.totalWeight) * newTotalWeight),
          msnf: roundToTwoDecimalPlaces((row.msnf / totals.totalWeight) * newTotalWeight),
        }))
      );
    else alert("Please enter a valid value greater than 0 grams");
    setEditTotalWeight(false);
  };

  return (
    <div>
      <TotalsCard
        totalWeight={roundToTwoDecimalPlaces(totals.totalWeight)}
        totalCalories={ roundToTwoDecimalPlaces(totals.totalCalories)}
        totalSugar={roundToTwoDecimalPlaces(totals.totalSugar)}
        totalSugarPercentage={roundToTwoDecimalPlaces((totals.totalSugar / totals.totalWeight) * 100)}
        totalFat={roundToTwoDecimalPlaces(totals.totalFat)}
        totalFatPercentage={roundToTwoDecimalPlaces((totals.totalFat / totals.totalWeight) * 100)}
        totalSolidPercentage={roundToTwoDecimalPlaces((totals.totalSol / totals.totalWeight) * 100)}
        totalMsnf={roundToTwoDecimalPlaces((totals.totalMSNF / totals.totalWeight) * 100)}
        editTotalWeight={editTotalWeight}
        setEditTotalWeight={setEditTotalWeight}
        setNewTotalWeight={setNewTotalWeight}
        handleSaveEditTotalWeight={handleSaveEditTotalWeight}
      />

        {/* ----- TABLE ----- */}
    <div className={className}>
      <div className="relative w-full overflow-auto">

        <Table>

          <TableHeader>
            <NewRecipeTableHeads />
          </TableHeader>

          <TableBody>
                
            {rows.map((row) => (
              <TableRow key={row.id} onClick={() => handleRowSelect(row)} 
                className={`${ selectedRow && selectedRow.id === row.id ? "bg-muted/50 h-16": "hover:bg-muted/20 cursor-pointer h-12" }`}
              >

                {/*---------Ingredients--------- */}
                <NewRecipeTableCells row={row} setNewWeight={setNewWeight} selectedRow={selectedRow} handleSaveEdit={handleSaveEdit} handleClose={handleClose} isEditingWeight={isEditingWeight} />

                {/*---------Actions--------- */}
                <TableCell className="flex justify-center items-center text-muted-foreground">
                  {selectedRow && selectedRow.id === row.id && (
                    <div className="flex items-center justify-end gap-2">

                      {/* ----- EDIT BUTTON ----- */}
                      <Button variant="ghost" size="icon" onClick={handleEditWeight} className="text-muted-foreground hover:text-primary">
                        <FilePenIcon className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </Button>

                      {/* ----- DELETE BUTTON ----- */}
                      <Button variant="ghost" size="icon" onClick={handleDelete} className="text-muted-foreground hover:text-destructive">
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Button> 

                    </div>
                  )}
                </TableCell>
                {/*---------/--- Actions--------- */}
              </TableRow>
            ))}
            
            <NewRecipeTableAddIngredientRow
              setIsAddingIngredient={setIsAddingIngredient}
              handleSaveNewRow={handleSaveNewRow}
              isAddingIngredient={isAddingIngredient}
            />
            
          </TableBody>
        </Table>
      </div>
    </div>
    {/* -----/--- TABLE ----- */}
    </div>
  )
}



/*

                                <div className="flex justify-center items-center">
                                {(isPopoverOpen2&&selectedRow && selectedRow.id === row.id) &&(

<Popover open={isPopoverOpen2} onOpenChange={setIsPopoverOpen2}>
<PopoverTrigger>
 {isPopoverOpen2}
</PopoverTrigger>
<PopoverContent className="w-[400px] p-4 grid gap-4" >
  <div className="grid gap-2">
    <Label htmlFor="weight" className="text-foreground">
      Weight
    </Label>
    <Input
      id="weight"
      type="number"
      placeholder="Enter weight"
      value={selectedRow.weight}
      onChange={(e) => setNewWeight(parseInt(e.target.value))}
    />
  </div>
  <div className="flex justify-end gap-2">
    <Button variant="outline" onClick={() => setIsPopoverOpen2(false)}>
      Cancel
    </Button>
    <Button onClick={handleSaveEdit}>Add</Button>

  </div>
</PopoverContent>
</Popover>
)}
        </div>

        */