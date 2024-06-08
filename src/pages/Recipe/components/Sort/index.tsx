import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { RecipeData } from '../../../../Types/recipe';
import SearchRecipeMenu from './components/SearchMenu';
import RecipeList from './components/RecipeList';




export default function RecipeFilter() {

   const [filteredRecipes, setFilteredRecipes] = useState<RecipeData[]>([]);
   const handleFilteredRecipesChange = (recipes: RecipeData[]) => {
     setFilteredRecipes(recipes);
   };
 
   return(
     <Box>
 
     <SearchRecipeMenu onFilteredRecipesChange={handleFilteredRecipesChange}/>


    <Box display='flex' alignItems="center"  justifyContent="center">
     <Typography variant="caption" gutterBottom >
      {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
    </Typography>
    </Box>


          <Container>
          <RecipeList recipes={filteredRecipes} /></Container>
 
 
     </Box>
   );
  };