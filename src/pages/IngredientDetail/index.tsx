import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import {  Http } from '../Recipe/components/Add/server/Http';
import { Ingredient } from '../../Types/ingredient';

const IngredientDetailPage = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        setIsLoading(true);
        const data = await Http({ header: 'ingredients', id: ingredientId , method: 'GET' });
        setIngredient(data);
        setIsLoading(false);
      } catch (err: Error  | any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchIngredient();
  }, [ingredientId]);

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
