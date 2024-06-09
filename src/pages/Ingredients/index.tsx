import { Container } from "@mui/material";
import useIngredientsArray from "../Recipe/components/Add/database/Array";



export default function IngredientsPage(){

   const { ingredientsByCategory, loading, error } = useIngredientsArray();

   if (loading) {
     return <div>Loading...</div>;
   }
 
   if (error) {
     return <div>Error: {error.message}</div>;
   }

   
   return (
      <Container>
        {Object.keys(ingredientsByCategory).map(category => (
          <div key={category}>
            <h2>{category}</h2>
            <ul>
              {ingredientsByCategory[category].map(ingredient => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    );
  };



