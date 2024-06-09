import { GridColDef } from "@mui/x-data-grid";
import { Row } from "../../../interfaces/recipe";
import { ingredientCategoryArray } from "../../../../../Types/ingredient";



function percentFormat(value: number | undefined): string {
   if (typeof value !== 'number') {
     throw new TypeError('Value must be a number');
   }
   return value !== undefined ? `${value}%` : '0%';
 }
 


 export const DataGridColumns: GridColDef[] = [
   { field: 'name', headerName: 'Name', width: 150 },
   { field: 'weight', headerName: 'Weight', align: 'left', type: 'number', editable: true, width: 100 },
   { field: 'category', headerName: 'Category', width: 150, valueOptions: ingredientCategoryArray, },
   { field: 'calories', headerName: 'Calories', type: 'number', width: 100, },
   { field: 'sugar', headerName: 'Sugar', type: 'number', width: 100, },
   { field: 'fat', headerName: 'Fat', type: 'number', width: 100, },
   { field: 'proteins', headerName: 'Proteins', type: 'number', width: 100,},
   { field: 'solids_percentage', headerName: 'Solids Percentage', width: 150, valueFormatter: (value) => percentFormat(value) },
   { field: 'msnf', headerName: 'MSNF', type: 'number', width: 100, valueFormatter: (value) => percentFormat(value) },
   { field: 'id', headerName: 'ID', width: 50, hideable: true, },
 ];



 export const initialRows: Row[] = [
  {
    id: '1', name: 'Milk', weight: 300, category: 'dairy', calories: 42, fat: 3, proteins: 3.4, solids_percentage: 8, msnf: 2.5,
    sugar: 0,
  },
  {
    id: '2', name: 'Sugar', weight: 300, category: 'sugars', calories: 387, fat: 0, proteins: 0, solids_percentage: 100, msnf: 0,
    sugar: 100,
  },
];
