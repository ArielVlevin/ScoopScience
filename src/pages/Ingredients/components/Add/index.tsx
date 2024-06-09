import  { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

import { IngredientCategory, ingredientCategoryArray } from '../../../../Types/ingredient';
import { Http, PostIngredient } from '../../../Recipe/components/Add/server/Http';


const AddIngredientForm = () => {
  
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('dairy');
  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [totalSolid, setTotalSolid] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [msnf, setMsnf] = useState(0);
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async () => {

    const newIngredient = {
         id,
         name,
         category: category as IngredientCategory,
         calories,
         sugar,
         fat,
         protein,
         totalSolid,
         msnf,
    };


      try{
        await PostIngredient(newIngredient);
      }catch(error){
        console.log(error);
      }  
     
  };
  useEffect(() => {
    const fetchID = async () => {
      try {
        const lastId = await Http({ header: 'ingredients/lastid', id: category, method: 'GET' });
        const newId = Number(lastId) + 1;

        setID(String(newId));
      } catch (error) {
        console.error('Error fetching ID:', error);
      }
    };

    fetchID();
  }, [category]);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4, alignItems:'center'}}>

      <FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      {/* TODO: Change to sort select */}
      <FormControl variant="outlined" sx={{ minWidth:200,maxWidth: 200, marginRight: 2 }}>
      <InputLabel htmlFor='Category'>Category</InputLabel>
      <Select
        label="Category"
        value={category}
        onChange={handleCategoryChange}
      >
        {ingredientCategoryArray.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>

      <TextField label="Calories" type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))} />
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>

      <TextField label="Fat" type="number" value={fat} onChange={(e) => setFat(Number(e.target.value))} />
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>
      <TextField label="Protein" type="number" value={protein} onChange={(e) => setProtein(Number(e.target.value))} />
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>
      <TextField label="Sugar" type="number" value={sugar} onChange={(e) => setSugar(Number(e.target.value))} />
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>
      <TextField label="Solids Percentage" type="number" value={totalSolid} onChange={(e) => setTotalSolid(Number(e.target.value))} />
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>
      <TextField label="MSNF" type="number" value={msnf} onChange={(e) => setMsnf(Number(e.target.value))} />
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>
      <Button onClick={handleSubmit} > Add Ingredient
      </Button>
      </FormControl>
    </Box>
  );
};

export default AddIngredientForm;
