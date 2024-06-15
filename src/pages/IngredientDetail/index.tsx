import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import useGetIngredient from '../../hooks/useGetIngredient';


const IngredientDetailPage = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();

  const {ingredientData, isLoading, isError, error} = useGetIngredient(String(ingredientId));


  if(isLoading) return <Container><h2>loading...</h2></Container>
  if(isError) return<Container><h2>{error?.message}</h2></Container> 

  return (
    <Container>
      <h1>Ingredient Detail</h1>
      {ingredientData ? (
        <div>
          <h2>{ingredientData.name}</h2>
          <p>Category: {ingredientData.category}</p>
          <p>Calories: {ingredientData.calories}</p>
          <p>Fat: {ingredientData.fat}</p>
          <p>Protein: {ingredientData.protein}</p>
          <p>Sugar: {ingredientData.sugar}</p>
          <p>Total Solids: {ingredientData.totalSolids}</p>
          <p>MSNF: {ingredientData.msnf}</p>
        </div>
      ) : (
        <p>Ingredient not found</p>
      )}
    </Container>
  );
};

export default IngredientDetailPage;
