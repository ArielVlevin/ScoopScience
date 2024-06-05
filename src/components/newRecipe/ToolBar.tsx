import { Button, Divider, Grid } from "@mui/material";
import { GridRowsProp, GridRowModesModel, GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import AddIngredientModal from "./AddIngredientModal";




interface EditToolbarProps {
   setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
   setRowModesModel: (
     newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
   ) => void;
   selectedRowIds: string[];
   rows: GridRowsProp;
 }
 



 
 export function Toolbar(props: EditToolbarProps) {
   const { setRows, setRowModesModel,selectedRowIds, rows } = props;


   function handleAddIngredient(category: string, ingredient: string, ingredientId: string) {
      const existingIngredient = rows.find(row => row.id === ingredientId);
      if (existingIngredient) {
        alert(`The ingredient "${ingredient}" already exists in the recipe.`);
      }else{
      setRows((oldRows) => [...oldRows, { id: ingredientId, name: ingredient, category, fat_percentage: 0, solids_percentage: 0, weight: 0, isNew: true }]);
      setRowModesModel((oldModel) => ({...oldModel, [ingredientId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }))};
   };
   function handleClickDelete() {
    setRows((oldRows) => oldRows.filter((row) => !selectedRowIds.includes(row.id)));
  }

  
 
   return (
    <Grid alignItems='center' alignSelf='lefts'  sx={{}} >
     <GridToolbarContainer>
      <AddIngredientModal onAdd={handleAddIngredient} />

       <Button variant="contained" onClick={handleClickDelete} sx={{backgroundColor:'darkred'}}>
         Delete Ingridiant
      </Button>
     </GridToolbarContainer>
     <Divider />
    </Grid>
   );
 }
