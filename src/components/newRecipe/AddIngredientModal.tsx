import * as React from 'react';
import { Box, Button, Typography, Modal, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

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

const ingredientsByCategory: { [key: string]: { id: string, name: string }[] } = {
  "milk base": [{ id: '1', name: "Milk" }, { id: '2', name: "Cream" }],
  "sugars": [{ id: '3', name: "Sugar" }, { id: '4', name: "Honey" }],
  "stabilizer": [{ id: '5', name: "Gelatin" }, { id: '6', name: "Pectin" }],
  "fruits": [{ id: '7', name: "Strawberries" }, { id: '8', name: "Blueberries" }],
  "adding": [{ id: '9', name: "Chocolate Chips" }, { id: '10', name: "Nuts" }],
};

interface AddIngredientModalProps {
  onAdd: (category: string, ingredient: string, id: string) => void;
}

export default function AddIngredientModal({ onAdd }: AddIngredientModalProps) {
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
      // Call the onAdd callback with the selected category, ingredient name, and ingredient ID
      onAdd(category, selectedIngredient.name, selectedIngredient.id);
      handleClose(); // Close the modal after adding
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <div>
      <Button variant="contained"color="primary" onClick={handleOpen} >Add Ingredient</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Category
          </Typography>
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
              <InputLabel id="ingredient-select-label">Ingredient</InputLabel>
              <Select
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
