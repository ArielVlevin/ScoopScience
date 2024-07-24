// NewRecipe.tsx
import { useState, useEffect } from "react";
import calculateTotals from "../../../.old/components/Calculate";
import { useGetIngredientsArray2 } from "../../hooks/useGetIngredient";
import { RecipeKind } from "../../types/recipe";
import { recipeValues } from "../../types/globalVar";
import { Ingredient, Row } from "../../types/ingredient";
import NewRecipeTable from "./table/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TotalsCard from "./totals/card";
import { roundToTwoDecimalPlaces } from "@/hooks/math";
import { useLocation } from "react-router-dom";


export default function NewRecipe() {

  //  TODO:: ask first if user want to change the recipe to the type recipe


  const location = useLocation();

  const defultRecipeData ={
    type: 'gelato',
    flavor: 'vanilla',
  };

  const recipeData = location.state || defultRecipeData ;



  const [rows, setRows] = useState<Row[]>([]);
  const [typeFilter, setTypeFilter] = useState<RecipeKind>('gelato');

  const [totals, setTotals] = useState(calculateTotals(rows));

  const { ingredients, isLoading, isError, error } = useGetIngredientsArray2({ header: 'ingredients/ingredientsArray', id: typeFilter });





  const [newTotalWeight, setNewTotalWeight] = useState<number>(totals.totalWeight);
  const [editTotalWeight, setEditTotalWeight] = useState<boolean>(false);

  // --------TOTALS----------//
  const handleSaveEditTotalWeight = () => {
    if (newTotalWeight >= 1){
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




  return (

    <div className="mt-4">


    <div>
      <h1>New Recipe Page</h1>
      <p>type: {recipeData.type}</p>
      <p>flavor: {recipeData.flavor}</p>
    </div>
      

      <Tabs defaultValue="recipe" className="w-full" >
        <TabsList className="grid grid-cols-2 w-11/12 mx-auto ">
                <TabsTrigger value="recipe">Recipe Data</TabsTrigger>
                <TabsTrigger value="product">Product</TabsTrigger>
        </TabsList>

        <TabsContent value="product">

          <div className="relative overflow-auto mb-12 grid gap-4 container mx-auto">


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
            
            <NewRecipeTable className="border rounded-lg border-gray-300 " 
              rows={rows} 
              setRows={setRows} 
              setTotals={setTotals} 
            />
         
          </div>
        </TabsContent>

        <TabsContent value="recipe" >
          <div className="relative w-full overflow-auto container">
            <Card className="mb-4 shadow-none">
              <CardContent className="grid gap-4">
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="recipeName" className="text-foreground">
                    Recipe Name
                  </Label>
                  <Input id="recipeName" type="text" placeholder="Enter recipe name"  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
      
    </div>

  )
}




/*

what do to::



  const [activeTab, setActiveTab] = useState<number>(1);


  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
  }

  //  recipe data
  const [recipeName, setRecipeName] = useState<string>('');

  //  recipe info
  const [weight, setWeight] = useState<number>(calculateTotals([]).totalWeight);
  const [totals, setTotals] = useState(calculateTotals([]));
  const [unit, setUnit] = useState('grams');




  const queryClient = useQueryClient();

  const newRecipeMutation = useMutation({
    mutationFn: postRecipe,
    onSuccess: () => {
      alert(`Recipe  added successfully!`);
    },
    onError(error) {
      alert(`Error adding recipe:  \n${error.message}`);
    },
  });





  const onSubmit = async () => {

   const recipedata: RecipeData = {
      id: '90002',      //TODO:: make id in backend
      recipeName,
      recipeIngredient: {
        ingredients: rows,
        kind: typeFilter as RecipeKind,
        totalWeight: weight,
        butterFat: 0,   //TODO
        msnf: totals.totalMSNF,        //TODO
        pac: 0,         //TODO
        pod: 0,         //TODO
        totalSolid: totals.totalSol,   
      },
      //set recipe rating to 0
      recipeRating: {
        likes: 0,
        ratingValue: 0,
        ratingAmount: 0
      },
      specialMarks: {     //TODO : add special marks
        lowSugar: false,
        highSugar: false,
        subSugar: false,
        lowFat: false,
        highFat: false,
        vegan: false,
        withEggs: false
      }
    };  

   newRecipeMutation.mutate(recipedata);

  };

  return (
    
 <Box sx={{ m: 2 }}>

      <Container>
      <BulletChartsContainer />
        <div role="tablist" className="tabs tabs-bordered mt-4 mb-8">
          <a id="tab-1" role="tab"  onClick={()=> {setActiveTab(1)}}  className={activeTab===1?"tab tab-active":"tab"}>Recipe Details</a>
          <a id="tab-2" role="tab"  onClick={()=> {setActiveTab(2)}}  className={activeTab===2?"tab tab-active":"tab"}>Ingredients Table</a>
          <a id="tab-3" role="tab"  onClick={()=> {setActiveTab(3)}}  className={activeTab===3?"tab tab-active":"tab"}>Charts</a>
        </div>

        {activeTab===1?        
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Grid>
          <TextField
              required
              variant="outlined"
              label="Recipe Name"
              sx={{ mr: 4 }}
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            {/*
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

          <Button variant="contained" sx={{ bgcolor: 'green', "&.MuiButton-root:hover": { bgcolor: 'greenyellow' } }} startIcon={<SendIcon />} onClick={onSubmit}>
            Send
          </Button>
        </Toolbar>
        : null}

        {activeTab===2||activeTab===3?  
        <div>
        <RecipeToolbar
          weight={weight}
          setWeight={setWeight}
          rows={rows}
          setRows={setRows}
          totals={totals}
          setTotals={setTotals}
          unit={unit}
          setUnit={setUnit}
        />


        <IngredientsDataGrid 
          rows={rows} 
          setRows={setRows} 
          setTotals={setTotals} 
        />
        </div> 
        : null
        }

      </Container>
    </Box>
    */









/*   OLD BUT GOLD

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

const handleTypeFilterChange = (event: SelectChangeEvent<typeof typeFilter>) => {
setTypeFilter(event.target.value);
};

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

//TODO:: TRANSFORM TO OTHER FILE:
const handleWeightChange = (newTotalWeight: number) => {
const currentTotalWeight = totals.totalWeight;
if (currentTotalWeight === 0) return;
const minimumWeight = recipeValues.minValueRecipe;
const adjustedTotalWeight = Math.max(minimumWeight, newTotalWeight);
const scalingFactor = adjustedTotalWeight / currentTotalWeight;

scss
Copy code
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

php
Copy code
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

  

            <Toolbar sx={{ justifyContent: "space-between", mt: 4, mb: 2 }}>

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

 
      <RecipeTextField label='Total Calories' value={totalCaloriesValue} isFocused />

      <UnitSelect onChange={handleUnitChange} />
    </Toolbar>



    <IngredientsDataGrid rows={rows} setRows={setRows} setTotals={setTotals} />


    
  </Container>
</Box>
);
}

*/



