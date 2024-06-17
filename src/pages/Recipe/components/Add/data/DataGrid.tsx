import { GridColDef } from "@mui/x-data-grid";
import { Row } from "../../../interfaces/Row";
import { ingredientCategoryArray } from "../../../../../Types/ingredient";
import { TextField } from "@mui/material";



function percentFormat(value: number | undefined): string {
   if (typeof value !== 'number') {
     throw new TypeError(`${value} must be a number!\n`);
   }
   return value !== undefined ? `${value}%` : '0%';
 }


 export const DataGridColumns: GridColDef[] = [
   { field: 'name', headerName: 'Ingredient', width: 150 },
   { field: 'weight', headerName: 'Weight', align: 'left', type: 'number', editable: true, width: 100, headerAlign: 'left',     renderEditCell: (params) => (
    <TextField
      type="number"
      inputProps={{ min: 0.1 }} // Set the minimum value here
      value={params.value}
      onChange={(event) => {
        const newValue = parseFloat(event.target.value);
        if(newValue > 9999){
          alert("Please enter a value less than 10,000 grams");
          params.api.setEditCellValue({ id: params.id, field: params.field, value: 9999});
        }
        else if (isNaN(newValue) || newValue < 0.1) {
          alert("Please enter a value more than 0.1 grams");
          params.api.setEditCellValue({ id: params.id, field: params.field, value: 0.1 });

        }else{
        params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
        }
      }}
    />
  ),
},
   { field: 'category', headerName: 'Category', width: 100, valueOptions: ingredientCategoryArray, },
   { field: 'calories', headerName: 'Calories', type: 'number', width: 100, headerAlign: 'left', },
   { field: 'sugar', headerName: 'Sugar', type: 'number', width: 100, headerAlign: 'left', },
   { field: 'fat', headerName: 'Fat', type: 'number', width: 100, headerAlign: 'left',},
   { field: 'protein', headerName: 'Protein', type: 'number', width: 100, headerAlign: 'left',},
   { field: 'totalSolids', headerName: 'Solids Percentage', type: 'number', width: 150, valueFormatter: (value)=>percentFormat(value), headerAlign: 'left', },
   { field: 'msnf', headerName: 'MSNF', type: 'number', width: 100, valueFormatter: (value)=>percentFormat(value), headerAlign: 'left',},
   { field: 'id', headerName: 'ID', width: 100, flex: 1, },
 ];




 export const initialRows: Row[] = [
  {
    id: '1', name: 'Milk', weight: 300, category: 'dairy', calories: 42, fat: 3, protein: 3.4, totalSolids: 8, msnf: 2.5,
    sugar: 0,
  },
  {
    id: '2', name: 'Sugar', weight: 300, category: 'sugars', calories: 387, fat: 0, protein: 0, totalSolids: 100, msnf: 0,
    sugar: 100,
  },
];
