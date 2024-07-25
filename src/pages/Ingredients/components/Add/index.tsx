import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Ingredient, IngredientCategory, ingredientCategoryArray } from '../../../../types/ingredient';
import { postIngredient } from '../../../../api/Post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';


const AddIngredientForm = () => {


  const { control, handleSubmit} = useForm<Ingredient>({
    defaultValues: {
      name: '',
      category: 'dairy' as IngredientCategory,
      calories: 0,
      fat: 0,
      protein: 0,
      totalSolids: 0,
      sugar: 0,
      msnf: 0,
    },
  });


  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addIngredientMutation = useMutation({
    mutationFn: postIngredient,
    onSuccess: (data) => {
      queryClient.setQueryData(['ingredients', data._id], data);
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      alert(`Ingredient ${data.name} added successfully!`);
      navigate(`/ingredients/${data._id}`);
    },
    onError: (error) => {
      alert(`Error adding ingredient: ${error.message}`);
    },
  });

  const onSubmit = (data: Ingredient) => {
    addIngredientMutation.mutate(data);
  };


  return (
      <form onSubmit={handleSubmit(onSubmit)} >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4, alignItems: 'center' }}>

        <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} label="Name" />}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 200, maxWidth: 200, marginRight: 2 }}>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Category">
                {ingredientCategoryArray.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}>
          <Controller
            name="calories"
            control={control}
            render={({ field }) => <TextField {...field} label="Calories" type="number" />}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}>
          <Controller
            name="fat"
            control={control}
            render={({ field }) => <TextField {...field} label="Fat" type="number" />}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}>
          <Controller
            name="protein"
            control={control}
            render={({ field }) => <TextField {...field} label="Protein" type="number" />}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}>
          <Controller
            name="sugar"
            control={control}
            render={({ field }) => <TextField {...field} label="Sugar" type="number" />}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}>
          <Controller
            name="totalSolids"
            control={control}
            render={({ field }) => <TextField {...field} label="Solids Percentage" type="number" />}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}>
          <Controller
            name="msnf"
            control={control}
            render={({ field }) => <TextField {...field} label="MSNF" type="number" />}
          />
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} type="submit">
            Add Ingredient
          </Button>
        </FormControl>
        </Box>

      </form>
  );
};

export default AddIngredientForm;
