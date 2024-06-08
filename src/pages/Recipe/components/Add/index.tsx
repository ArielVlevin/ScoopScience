import { Box, Button, Container } from "@mui/material";
import { Row } from "../../interfaces/recipe";
import calculateTotals from "./components/CalculateTotal";
import IngredientsDataGrid from "./components/RecipeDataGrid";
import SendIcon from '@mui/icons-material/Send';


import React from "react";


const initialRows: Row[] = [
  { id: '1', name: 'Milk', category: 'milk base', fat_percentage: 3, solids_percentage: 8, weight: 500 },
  { id: '3', name: 'Sugar', category: 'sugars', fat_percentage: 0, solids_percentage: 100, weight: 200 },
  // Add more initial rows as needed
];


export default function RecipeCreation(){
   const [rows, setRows] = React.useState<Row[]>(initialRows);
   const [totals, setTotals] = React.useState(calculateTotals(initialRows));
 
   React.useEffect(() => {
     setTotals(calculateTotals(rows));
   }, [rows]);
 
   return (
      <Box sx={{margin:2}}>
     <Container >
      <h3>Recipe name: </h3>
      <h3>Type: </h3>

       <IngredientsDataGrid rows={rows} setRows={setRows} setTotals={setTotals} />
       <Box sx={{marginTop:4}}>
         <p>Total weight: {totals.totalWeight}</p>
         <p>Total Fat: {totals.totalFat} grams</p>
         <p>Total Fat: {(totals.totalFat / (totals.totalWeight / 100)).toFixed(2)}%</p>
         <p>Total Solid: {(totals.totalSolid / (totals.totalWeight / 100)).toFixed(2)}%</p>
       </Box>
      <Box   display="flex" flexDirection="column" alignItems='end'
>
       <Button variant="contained" sx={{marginRight:4 ,marginTop:4, bgcolor:'green',"&.MuiButton-root:hover":{bgcolor:'greenyellow'} }} startIcon={<SendIcon />} >send</Button>
      </Box>
     </Container>
     </Box>
   );
 };
