import { Outlet } from "react-router-dom";
import Navbar from "../layouts/navbar/Navbar";
import { Container, Divider } from "@mui/material";
import BreadcrumbNavigation from "../layouts/BreadCrumbNav";

function RootLayout(){
   return <>
   <Navbar />
   <BreadcrumbNavigation />
   <Divider />
   <Container>  
      <Outlet/>
   </Container>
   </>;
}

export default RootLayout;
