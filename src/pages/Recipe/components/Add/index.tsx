import { Box, Button, Container, Grid, InputAdornment, MenuItem, SelectChangeEvent, TextField, Toolbar } from "@mui/material";
import calculateTotals, { formatTotalValue } from "./components/Calculate";
import IngredientsDataGrid from "./components/DataGrid";
import SendIcon from '@mui/icons-material/Send';

import { useEffect, useState } from "react";
import SortSelect from "../../../../components/sort/Select";
import RecipeTextField, { UnitSelect } from "../../../../components/sort/TextField";
import { Ingredient, Row } from "../../../../Types/ingredient";
import { useGetIngredientsArray2 } from "../../../../hooks/useGetIngredient";
import { recipeValues } from "../../../../Types/globalVar";
import { typeOptions } from "../../../../Types/recipe";






export default function NewRecipe() {
  const [typeFilter, setTypeFilter] = useState<string>('gelato');
  const [rows, setRows] = useState<Row[]>([]);
  const [weight, setWeight] = useState<number>(calculateTotals([]).totalWeight);
  const [totals, setTotals] = useState(calculateTotals([]));
  const [unit, setUnit] = useState('grams');

  const { ingredients, isLoading, isError, error } = useGetIngredientsArray2({ header: 'ingredientsArray', id: typeFilter });


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
    setWeight(calculateTotals(rows).totalWeight);
  }, [rows]);

  const handleTypeFilterChange = (event: SelectChangeEvent<typeof typeFilter>) => {
    setTypeFilter(event.target.value);
  };

  const handleWeightChange = (newTotalWeight: number) => {
    const currentTotalWeight = totals.totalWeight;
    if (currentTotalWeight === 0) return;
    const minimumWeight = recipeValues.minValueRecipe;
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
  const totalSolidValue = formatTotalValue(totals.totalSol, totals.totalWeight, unit);
  const totalCaloriesValue = formatTotalValue(totals.totalCalories, totals.totalWeight, 'grams');
  const totalSugarValue = formatTotalValue(totals.totalSugar, totals.totalWeight, unit);
  const totalMSNFValue = formatTotalValue(totals.totalMSNF, totals.totalWeight, unit);

  const handleUnitChange = (event: SelectChangeEvent<string>) => {
    setUnit(event.target.value as string);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Container>

        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Grid >
          <TextField required variant="outlined" label='Recipe Name' sx={{ mr: 4}}/>
          <SortSelect
            id="Type"
            value={typeFilter}
            onChangeHandler={handleTypeFilterChange}
            options={typeOptions.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          />
          </Grid>
          <div />
          <Button variant="contained" sx={{ bgcolor: 'green', "&.MuiButton-root:hover": { bgcolor: 'greenyellow' } }} startIcon={<SendIcon />}>Send</Button>
        </Toolbar>

       {/**
                  // TODO: MAKE IT ONE FUNCTION:
                **/ }
          

        <Toolbar sx={{ justifyContent: "space-between", mt: 4, mb: 2 }}>

                {/**
                  // TODO: change thks to recipe textfield too 
                **/ }
          <TextField label="Total Weight" type='number' sx={{ m: 1, width: '23ch' }} value={weight}
              onChange={e => { handleWeightChange(Number(e.target.value)) }}
              InputProps={{ endAdornment: <InputAdornment position="end">grams</InputAdornment>, }}
            />

          <RecipeTextField label='Total Fat' value={totalFatValue} unit={unit} isFocused />
          <RecipeTextField label='Total Solid' value={totalSolidValue} unit={unit} isFocused />
          <RecipeTextField label='Total Sugar' value={totalSugarValue} unit={unit} isFocused />
          <RecipeTextField label='Total MSNF' value={totalMSNFValue} unit={unit} isFocused />
        </Toolbar>

        <Toolbar sx={{ justifyContent: "space-between", mb: 4 }}>

                {/**
                // TODO: change to kkl
              **/ }
          <RecipeTextField label='Total Calories' value={totalCaloriesValue} isFocused />

          <UnitSelect onChange={handleUnitChange} />
        </Toolbar>



        <IngredientsDataGrid rows={rows} setRows={setRows} setTotals={setTotals} />


        
      </Container>
    </Box>
  );
}


/* old:
        <Box sx={{ m: 2 }} display="flex" flexDirection="row"  >

          <Box display="flex" flexDirection="row" alignItems='left'>

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

          <Box display="flex" flexDirection="row" alignItems='right'>
            <Button variant="contained" sx={{ bgcolor: 'green', "&.MuiButton-root:hover": { bgcolor: 'greenyellow' } }} startIcon={<SendIcon />}>Send</Button>
          </Box>

        </Box>




                <Box sx={{ marginTop: 4 }}>


        */