import React, { useEffect } from 'react';


// Sample recipe data
const recipes = null;

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

