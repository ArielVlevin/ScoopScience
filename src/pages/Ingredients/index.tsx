import { Box, Container, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetIngredientsArray } from "../../hooks/useGetIngredient";



export default function IngredientsPage(){

   const { ingredientsByCategory, isLoading, isError, error } = useGetIngredientsArray();

   if (isLoading) {
     return <div>Loading...</div>;
   }
 
   if (isError && error) {
     return <div>Error: {error.message}</div>;
   }
   
   return (
    <Container sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {Object.keys(ingredientsByCategory).map((category) => (
        <Box key={category} sx={{ width: '100%', maxWidth: 300, m:4,}} >
          <Typography variant="h4" gutterBottom sx={{ width: '100%', maxWidth: 300, textAlign: 'center' }}>
            {category}
          </Typography>
          <List sx={{ width: '100%', maxWidth: 300, backgroundColor: '#CB8851',}}>
            {ingredientsByCategory[category].map((ingredient) => (
              <ListItem key={ingredient.id} button component={Link} to={`/ingredients/${ingredient.id}`}>
                <ListItemText primary={ingredient.name} sx={{textAlign: 'center'}} />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Grid>
  </Container>
  );
};


