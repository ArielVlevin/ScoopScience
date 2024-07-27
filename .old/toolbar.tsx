// RecipeToolbar.tsx
import React from "react";
import {
  Toolbar,
  TextField,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import { recipeValues } from "../src/types/globalVar";
import { Row } from "../src/types/ingredientTypes";
import { formatTotalValue } from "./components/Calculate";

interface RecipeToolbarProps {
  weight: number;
  setWeight: (weight: number) => void;
  rows: Row[];
  setRows: (rows: Row[]) => void;
  totals: any; // Replace 'any' with the correct type if available
  setTotals: (totals: any) => void;
  unit: string;
  setUnit: (unit: string) => void;
}

const RecipeToolbar: React.FC<RecipeToolbarProps> = ({
  weight,
  setWeight,
  rows,
  setRows,
  totals,
  setTotals,
  unit,
  setUnit,
}) => {
  const handleWeightChange = (newTotalWeight: number) => {
    const currentTotalWeight = totals.totalWeight;
    if (currentTotalWeight === 0) return;
    const minimumWeight = recipeValues.minValueRecipe;
    const adjustedTotalWeight = Math.max(minimumWeight, newTotalWeight);
    const scalingFactor = adjustedTotalWeight / currentTotalWeight;

    const updatedRows = rows.map((row) => ({
      ...row,
      weight: parseFloat((row.weight * scalingFactor).toFixed(2)),
    }));

    setRows(updatedRows);
    setWeight(adjustedTotalWeight);
  };

  const totalFatValue = formatTotalValue(
    totals.totalFat,
    totals.totalWeight,
    unit
  );
  const totalSolidValue = formatTotalValue(
    totals.totalSol,
    totals.totalWeight,
    unit
  );
  const totalCaloriesValue = formatTotalValue(
    totals.totalCalories,
    totals.totalWeight,
    "grams"
  );
  const totalSugarValue = formatTotalValue(
    totals.totalSugar,
    totals.totalWeight,
    unit
  );
  const totalMSNFValue = formatTotalValue(
    totals.totalMSNF,
    totals.totalWeight,
    unit
  );

  const handleUnitChange = (event: SelectChangeEvent<string>) => {
    setUnit(event.target.value as string);
  };

  return (
    <>
      <Toolbar sx={{ justifyContent: "space-between", mt: 4, mb: 2 }}>
        <TextField
          label="Total Weight"
          type="number"
          sx={{ m: 1, width: "23ch" }}
          value={weight}
          onChange={(e) => {
            handleWeightChange(Number(e.target.value));
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">grams</InputAdornment>,
          }}
        />
        {/*
        <RecipeTextField label='Total Fat' value={totalFatValue} unit={unit} isFocused />
        <RecipeTextField label='Total Solid' value={totalSolidValue} unit={unit} isFocused />
        <RecipeTextField label='Total Sugar' value={totalSugarValue} unit={unit} isFocused />
        <RecipeTextField label='Total MSNF' value={totalMSNFValue} unit={unit} isFocused />
      </Toolbar>
      <Toolbar sx={{ justifyContent: "space-between", mb: 4 }}>
        <RecipeTextField label='Total Calories' value={totalCaloriesValue} isFocused />
        <UnitSelect onChange={handleUnitChange} /> */}
      </Toolbar>
    </>
  );
};

export default RecipeToolbar;
