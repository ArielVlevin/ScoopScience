import React from 'react';
import Grid from '@mui/material/Grid';
import RecipeReviewCard from '../cards/recipeCard';
import { RecipeData } from '../cards/recipeType';

interface RecipeListProps {
  recipes: RecipeData[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item key={recipe.id} xs={12} sm={6} md={4}>
          <RecipeReviewCard {...recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
