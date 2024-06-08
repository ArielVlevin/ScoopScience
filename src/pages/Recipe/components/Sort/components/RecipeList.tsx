import React from 'react';
import Grid from '@mui/material/Grid';
import { RecipeData } from '../../../../../Types/recipe';
import RecipeReviewCard from '../../Card/recipeCard';

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
