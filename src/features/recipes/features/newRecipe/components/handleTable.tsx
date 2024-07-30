import { Row, Ingredient, RecipeKind } from "@/types";
import { useState, useEffect } from "react";
import { recipeValues } from "@/types/globalVar";

import { useGetIngredientsArray2 } from "@/features/ingredients/hooks/useGetIngredientArray2";
import Loading from "@/pages/loading";
import ErrorPage from "@/pages/error";
import { calculateAndRound } from "../../../utils/calculateAndRound";
import { Totals } from "../../../types/totalsTypes";
import { Label } from "@/components/ui/label";
import TotalsCard from "./totalsCard";
import NewRecipeTable from "./newRecipeTable/table";

type HanldeIngredientProps = {
  recipeKind?: RecipeKind;
  recipeBase?: string;
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  totals: Totals;
  setTotals: React.Dispatch<React.SetStateAction<Totals>>;
};

export default function HanldeTable({
  recipeKind = "gelato",
  recipeBase,
  rows,
  setRows,
  totals,
  setTotals,
}: HanldeIngredientProps) {
  //const [rows, setRows] = useState<Row[]>([]);
  //const [totals, setTotals] = useState<Totals>(calculateTotals(rows));

  const [typeFilter] = useState<RecipeKind>(recipeKind);

  const base = recipeBase ? recipeBase : recipeKind;
  const { ingredients, isLoading, isError, error } =
    useGetIngredientsArray2(base);

  const [newTotalWeight, setNewTotalWeight] = useState<number>(
    totals.totalWeight
  );
  const [editTotalWeight, setEditTotalWeight] = useState<boolean>(false);

  // --------TOTALS----------//
  const handleSaveEditTotalWeight = () => {
    if (newTotalWeight >= 1) {
      setRows(
        rows.map((row) => ({
          ...row,
          weight: calculateAndRound(
            row.weight,
            totals.totalWeight,
            newTotalWeight
          ),
          calories: calculateAndRound(
            row.calories,
            totals.totalWeight,
            newTotalWeight
          ),
          sugar: calculateAndRound(
            row.sugar,
            totals.totalWeight,
            newTotalWeight
          ),
          fat: calculateAndRound(row.fat, totals.totalWeight, newTotalWeight),
          protein: calculateAndRound(
            row.protein,
            totals.totalWeight,
            newTotalWeight
          ),
          msnf: calculateAndRound(row.msnf, totals.totalWeight, newTotalWeight),
        }))
      );
      setEditTotalWeight(false);
    } else alert("Please enter a valid value greater than 0 grams");
  };

  // --------/TOTALS----------//

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      const newRows = ingredients.map((ingredient: Ingredient) => ({
        ...ingredient,
        weight: recipeValues.defaultWeightRecipe,
      }));
      setRows(newRows);
    }
  }, [ingredients, typeFilter]);

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error.message} />;

  return (
    <div>
      <Label className="text-lg font-medium">Ingredients Table</Label>

      <NewRecipeTable
        className="border rounded-lg border-gray-300 "
        rows={rows}
        setRows={setRows}
        setTotals={setTotals}
      />
      <Label className="text-lg font-medium">Totals</Label>
      <TotalsCard
        totals={totals}
        editTotalWeight={editTotalWeight}
        setEditTotalWeight={setEditTotalWeight}
        setNewTotalWeight={setNewTotalWeight}
        handleSaveEditTotalWeight={handleSaveEditTotalWeight}
      />
    </div>
  );
}
