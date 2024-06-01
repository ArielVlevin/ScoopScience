import { useParams } from "react-router-dom";



function ProductDetailPage(){

   const params = useParams();


   return(
   <>
   <h1>products</h1>
   
   <h2>product ID: {params.productId}</h2>
   
   </>
   );
}

export default ProductDetailPage;