import { useState, useEffect } from 'react';

const useIngredientsArray = () => {
  const [ingredientsByCategory, setIngredientsByCategory] = useState<{ [key: string]: { id: string, name: string }[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchIngredientsByCategory = async () => {
      try {
        const response = await fetch('http://localhost:3000/ingredientsArray');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setIngredientsByCategory(data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredientsByCategory();
  }, []);

  return { ingredientsByCategory, loading, error };
};

export default useIngredientsArray;
