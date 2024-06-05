import React, { useEffect } from 'react';
import { RecipeData } from '../cards/recipeType';


// Sample recipe data
const recipes: RecipeData = {
  id: "2",
  recipeName: "nice cream 1",
  user: { id: "1", userName: "User 1" },
  specialMarks: {
    lowSugar: false,
    highSugar: true,
    subSugar: false,
    lowFat: false,
    highFat: true,
    vegan: false,
    withEggs: true,
  },
  recipeRating: {
    likes: 10,
    ratingValue: 4.5,
    ratingAmount: 20,
  },
  recipeIngredient: {
    ingredients: [
      [{ id: "1", name: "Milk", category: "milk base", fat_percentage: 2, solids_percentage: 8 }, 500],
      [{ id: "2", name: "Sugar", category: "sugars", fat_percentage: 0, solids_percentage: 100 }, 200],
    ],
    kind: 'ice cream',
    totalWeight: 700,
    butterFat: 10,
    msnf: 20,
    pac: 30,
    pod: 40,
    totalSolid: 50,
  },
};

export const RecipeForm: React.FC = () => {

  const sendRecipeToServer = async () => {
   console.log("Submitting recipe...");

    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipes),
      });

      console.log("Response received...");

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Recipe submitted successfully:', result);
    } catch (error) {
      console.error('Error sending recipe:', error);
    }
  };

  // Use useEffect to send data when the component mounts
  useEffect(() => {
    console.log("Component mounted, sending recipe...");
    sendRecipeToServer();
  }, []);

 
  return (
    <div>
      <h1>Recipe Submission</h1>
      <button onClick={sendRecipeToServer}>Submit Recipe</button>
    </div>
  );
};

