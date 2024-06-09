import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import GetIngredient from '../Ingredients/database/get';

const IngredientDetailPage = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();

  const { ingredient, isLoading, error } = GetIngredient(String(ingredientId));


  //TODO: WHEN ERROR: IF THE ERROR BECAUSE THE INGREDIENT DOESN'T EXIST, SHOW A MESSAGE THAT THE INGREDIENT DOESN'T EXIST
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <h1>Ingredient Detail</h1>
      {ingredient ? (
        <div>
          <h2>{ingredient.name}</h2>
          <p>Category: {ingredient.category}</p>
          <p>Calories: {ingredient.calories}</p>
          <p>Fat: {ingredient.fat}</p>
          <p>Protein: {ingredient.protein}</p>
          <p>Sugar: {ingredient.sugar}</p>
          <p>Total Solids: {ingredient.totalSolid}</p>
          <p>MSNF: {ingredient.msnf}</p>
        </div>
      ) : (
        <p>Ingredient not found</p>
      )}
    </Container>
  );
};

export default IngredientDetailPage;
