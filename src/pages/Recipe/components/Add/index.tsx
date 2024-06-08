import { Box, Button, Container, FormControl, FormHelperText, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import calculateTotals, { currencies, formatTotalValue } from "./components/Calculate";
import IngredientsDataGrid from "./components/DataGrid";
import SendIcon from '@mui/icons-material/Send';

import React, { useEffect, useState } from "react";
import SortSelect from "../Sort/components/SortSelect";
import RecipeTextField, { UnitSelect } from "./components/TextField";
import { Row } from "../../interfaces/recipe";

const initialRows: Row[] = [
  {
    id: '1', name: 'Milk', weight: 300, category: 'dairy', calories: 42, fat: 3, proteins: 3.4, solids_percentage: 8, msnf: 2.5,
    sugar: 0,
  },
  {
    id: '2', name: 'Sugar', weight: 300, category: 'sugars', calories: 387, fat: 0, proteins: 0, solids_percentage: 100, msnf: 0,
    sugar: 100,
  },
];

const typeOptions = ['gelato', 'ice cream', 'sorbet', 'other'];

export default function RecipeCreation() {
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [weight, setWeight] = useState(calculateTotals(initialRows).totalWeight);
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [totals, setTotals] = useState(calculateTotals(initialRows));
  const [unit, setUnit] = useState('grams');

  const handleTypeFilterChange = (event: SelectChangeEvent<typeof typeFilter>) => {
    setTypeFilter(event.target.value);
  };

  useEffect(() => {
    setTotals(calculateTotals(rows));
    setWeight(calculateTotals(rows).totalWeight);
  }, [rows]);

  const handleWeightChange = (newTotalWeight: number) => {
    const currentTotalWeight = totals.totalWeight;
    if (currentTotalWeight === 0) return;
    const minimumWeight = 1;
    const adjustedTotalWeight = Math.max(minimumWeight, newTotalWeight);
    const scalingFactor = adjustedTotalWeight / currentTotalWeight;

    const updatedRows = rows.map(row => ({
      ...row,
      weight: parseFloat((row.weight * scalingFactor).toFixed(2))
    }));

    setRows(updatedRows);
    setWeight(adjustedTotalWeight);
  };

  const totalFatValue = formatTotalValue(totals.totalFat, totals.totalWeight, unit);
  const totalSolidValue = formatTotalValue(totals.totalSolid, totals.totalWeight, unit);
  const totalCaloriesValue = formatTotalValue(totals.totalCalories, totals.totalWeight, unit);
  const totalSugarValue = formatTotalValue(totals.totalSugar, totals.totalWeight, unit);
  const totalMSNFValue = formatTotalValue(totals.totalMSNF, totals.totalWeight, unit);

  const handleUnitChange = (event: SelectChangeEvent<string>) => {
    setUnit(event.target.value as string);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Container>
        <Box sx={{ m: 2 }}>
          <TextField required variant="outlined" label='Recipe Name' sx={{ mr: 2 }} />

          <SortSelect
            id="Type"
            value={typeFilter}
            onChangeHandler={handleTypeFilterChange}
            options={typeOptions.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          />
        </Box>

        <IngredientsDataGrid rows={rows} setRows={setRows} setTotals={setTotals} />

        <Box sx={{ marginTop: 4 }}>
          <TextField label="Total Weight" type='number' sx={{ m: 1, width: '25ch' }} value={weight}
            onChange={e => { handleWeightChange(Number(e.target.value)) }}
            InputProps={{ endAdornment: <InputAdornment position="end">grams</InputAdornment>, }}
          />

          <RecipeTextField label='Total Fat' value={totalFatValue} unit={unit} isFocused />
          <RecipeTextField label='Total Solid' value={totalSolidValue} unit={unit} isFocused />
          <RecipeTextField label='Total Sugar' value={totalSugarValue} unit={unit} isFocused />
          <RecipeTextField label='Total Calories' value={totalCaloriesValue} unit={unit} isFocused />
          <RecipeTextField label='Total MSNF' value={totalMSNFValue} unit={unit} isFocused />
          <UnitSelect onChange={handleUnitChange} />

          <Box display="flex" flexDirection="column" alignItems='end'>
            <Button variant="contained" sx={{ mr: 4, mt: 4, bgcolor: 'green', "&.MuiButton-root:hover": { bgcolor: 'greenyellow' } }} startIcon={<SendIcon />}>Send</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
