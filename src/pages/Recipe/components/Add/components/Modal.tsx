import * as React from 'react';
import { Box, Button, Typography, Modal, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Toolbar } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { useGetIngredientsArray } from '../../../../../hooks/useGetIngredient';
import NewIngredientModal from '../../../../Ingredients/components/Add/Modal';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


interface AddIngredientModalProps {
  onAdd: (category: string, ingredient: string, id: string) => void;
}

export default function AddIngredientModal({ onAdd }: AddIngredientModalProps) {
  const { ingredientsByCategory, isLoading, isError, error } = useGetIngredientsArray();

  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState<string>('');
  const [selectedIngredient, setSelectedIngredient] = React.useState<{ id: string, name: string } | null>(null);

  const handleOpen = () => {
    setOpen(true);
    setCategory('');
    setSelectedIngredient(null);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value as string);
    setSelectedIngredient(null); // Reset ingredient selection
  };

  const handleIngredientChange = (event: SelectChangeEvent<string>) => {
    const ingredientId = event.target.value;
    const ingredient = ingredientsByCategory[category].find(item => item.id === ingredientId);
    setSelectedIngredient(ingredient || null);
  };

  const handleAdd = () => {
    if (selectedIngredient) {
      onAdd(category, selectedIngredient.name, selectedIngredient.id);
      
      handleClose(); // Close the modal after adding
    }
  };

  const handleCancel = () => {
    handleClose();
  };



  //TODO: make the loading and error better(loading inside the modal and not in the button)

  if (isLoading) {
    return <div>Modal Loading...</div>;
  }

  if (isError && error) {
    return <div>Modal Error: {error.message}</div>;
  }


  return (
    <div>

      <Button variant="contained"onClick={handleOpen} sx={{bgcolor:'navy'}} startIcon={<AddIcon />}>Add Ingredient</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          
          <Toolbar sx={{ justifyContent: "space-between", mb: 4 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select Category
            </Typography>
            <NewIngredientModal />
          </Toolbar>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              {Object.keys(ingredientsByCategory).map((categoryKey) => (
                <MenuItem key={categoryKey} value={categoryKey}>{categoryKey}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {category && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="ingredient-select-label">Ingredient</InputLabel>              <Select
                labelId="ingredient-select-label"
                id="ingredient-select"
                value={selectedIngredient?.id || ''}
                label="Ingredient"
                onChange={handleIngredientChange}
              >
                {ingredientsByCategory[category]?.map((ingredient, index) => (
                  <MenuItem key={index} value={ingredient.id}>{ingredient.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {selectedIngredient && (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Selected Ingredient: {selectedIngredient.name}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
