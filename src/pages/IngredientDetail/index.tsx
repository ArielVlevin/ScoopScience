import { Container } from "@mui/material";
import { useParams } from "react-router-dom";




export default function IngredientDetailPage(){

   const params = useParams();


   return(
   <Container>
   <h1>products</h1>
   
   <h2>product ID: {params.productId}</h2>
   
   </Container>
   );
}
