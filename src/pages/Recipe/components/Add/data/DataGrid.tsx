import { GridColDef } from "@mui/x-data-grid";



function percentFormat(value: number | undefined): string {
   if (typeof value !== 'number') {
     throw new TypeError('Value must be a number');
   }
   return value !== undefined ? `${value}%` : '0%';
 }
 

 const categoryKind = ['milk base', 'sugars', 'stabilizer', 'fruits', 'adding'];

 export const DataGridColumns: GridColDef[] = [
   { field: 'name', headerName: 'Name', width: 150 },
   { field: 'weight', headerName: 'Weight', align: 'left', type: 'number', editable: true, width: 100 },
   { field: 'category', headerName: 'Category', width: 150, valueOptions: categoryKind, },
   { field: 'calories', headerName: 'Calories', type: 'number', width: 100, },
   { field: 'sugar', headerName: 'Sugar', type: 'number', width: 100, },
   { field: 'fat', headerName: 'Fat', type: 'number', width: 100, },
   { field: 'proteins', headerName: 'Proteins', type: 'number', width: 100,},
   { field: 'solids_percentage', headerName: 'Solids Percentage', width: 150, valueFormatter: (value) => percentFormat(value) },
   { field: 'msnf', headerName: 'MSNF', type: 'number', width: 100, valueFormatter: (value) => percentFormat(value) },
   { field: 'id', headerName: 'ID', width: 50, hideable: true, },
 ];