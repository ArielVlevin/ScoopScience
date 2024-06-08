
import DeleteIcon from '@mui/icons-material/Delete';
import { ToolbarProps } from '../../../interfaces/recipe';
import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';
import { Box, Button, Divider } from '@mui/material';
import AddIngredientModal from './Modal';


 export function Toolbar(props: ToolbarProps) {
   const { setRows, setRowModesModel,selectedRowIds, rows } = props;


   function handleAddIngredient(category: string, ingredient: string, ingredientId: string) {
      if (!category || !ingredient || !ingredientId) {
        throw new Error('Missing required parameters for adding ingredient');
      }
      
      const existingIngredient = rows.find(row => row.id === ingredientId);
      if (existingIngredient) {
        alert(`The ingredient "${ingredient}" already exists in the recipe.`);
      } else {
        setRows((oldRows) => [
          ...oldRows,
          {        
            id: ingredientId,
            name: ingredient,
            category,
            weight: 10,
            calories: 0,
            sugar: 0,
            fat: 0,
            proteins: 0,
            solids_percentage: 0,
            msnf: 0,
            isNew: true,
          },
        ]);
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [ingredientId]: {
            mode: GridRowModes.Edit,
            fieldToFocus: 'name',
          },
        }));
      }
   };
   function handleClickDelete() {
    setRows((oldRows) => oldRows.filter((row) => !selectedRowIds.includes(row.id)));
  }

  
 
   return (
    <Box >
     <GridToolbarContainer sx={{ margin:0.8, marginBottom:1.2}} >
      <AddIngredientModal onAdd={handleAddIngredient} />

       <Button variant="contained" onClick={handleClickDelete} startIcon={<DeleteIcon />} sx={{backgroundColor:'darkred', "&.MuiButton-root:hover":{bgcolor:'red'}}}>
         Delete Ingridiant
      </Button>
     </GridToolbarContainer>
     <Divider />
    </Box>
   );
 }
