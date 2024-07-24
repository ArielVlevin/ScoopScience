import DeleteIcon from '@mui/icons-material/Delete';
import { GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer } from '@mui/x-data-grid';
import { Backdrop, Box, Button, CircularProgress, Divider } from '@mui/material';
import AddIngredientModal from './Modal';
import { useEffect, useState } from 'react';
import useGetIngredient from '../../../../../hooks/useGetIngredient';
import { recipeValues } from '../../../../../Types/globalVar';
import Loading from '../../../../../layouts/loading';



export interface ToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  selectedRowIds: string[];
  rows: GridRowsProp;
}

export function Toolbar(props: ToolbarProps) {
  const { setRows, setRowModesModel, selectedRowIds, rows } = props;
  const [ingredientId, setIngredientId] = useState<string | null>(null);
  const { ingredientData, isLoading, isError, error } = useGetIngredient(ingredientId as string);

  useEffect(() => {
    if (ingredientData && !isLoading && !error) {
      setRows((oldRows) => [
        ...oldRows,
        {
          id: ingredientData.id,
          name: ingredientData.name,
          category: ingredientData.category,
          calories: ingredientData.calories,
          sugar: ingredientData.sugar,
          fat: ingredientData.fat,
          protein: ingredientData.protein,
          totalSolids: ingredientData.totalSolids,
          msnf: ingredientData.msnf,
          weight: recipeValues.defaultWeightRecipe,
          isNew: true,
        },
      ]);

      setRowModesModel((oldModel) => ({
        ...oldModel,
        [ingredientData.id]: {
          mode: GridRowModes.Edit,
          fieldToFocus: 'name',
        },
      }));

      setIngredientId(null); // Reset ingredientId after adding the ingredient
    }
  }, [ingredientData, isLoading, error, setRows, setRowModesModel]);

  function handleAddIngredient(category: string, ingredientName: string, ingredientId: string) {
    if (!category || !ingredientName || !ingredientId) {
      console.error('Missing required parameters:', { category, ingredientName, ingredientId });
      throw new Error('Missing required parameters for adding ingredient');
    }

    const existingIngredient = rows.find((row) => row.id === ingredientId);
    if (existingIngredient) {
      alert(`The ingredient "${ingredientName}" already exists in the recipe.`);
    } else {
      alert(`Adding ${ingredientName} from ${category}`);
      setIngredientId(ingredientId); 
    }
  }

  function handleClickDelete() {
    setRows((oldRows) => oldRows.filter((row) => !selectedRowIds.includes(row.id)));
  }

  if(isLoading) {
   return <Loading isLoading={isLoading}/>
  }
  if(isError && error) {
    return <div>ToolBar Error: {error.message}</div>
  }

  return (
    <Box>
      <GridToolbarContainer sx={{display: 'flex', margin: 0.8, marginBottom: 1.2}}>

        <AddIngredientModal onAdd={handleAddIngredient} />
        
        <Button
          variant="contained"
          onClick={handleClickDelete}
          startIcon={<DeleteIcon />}
          sx={{ backgroundColor: 'darkred', "&.MuiButton-root:hover": { bgcolor: 'red' } }}
        >
          Delete Ingredient
        </Button>
      </GridToolbarContainer>
      <Divider />
    </Box>
  );
}