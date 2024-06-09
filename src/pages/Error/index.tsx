

import { Container } from "@mui/material";
import Navbar from "../../layouts/navbar";


interface ErrorPageProps
{
   error?: string;
}
export default function ErrorPage({error='error'}: ErrorPageProps){
   return(
      <>
      <Navbar><></></Navbar>
      <Container>
         <h1>Error Page</h1>
         <p>{error}</p>
      </Container>
      </>
      );
   }