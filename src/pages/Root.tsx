import { Outlet } from "react-router-dom";
import Navbar from "../layouts/navbar";
import {Box, Divider } from "@mui/material";
import BreadcrumbNavigation from "../layouts/BreadCrumbNav";

function RootLayout(){
   return <>
   <Navbar>
      <></>
   </Navbar>
   <Box sx={{minHeight:'800px'}}>
   <BreadcrumbNavigation />
   <Divider />
   <Outlet/>
   </Box>
   </>;
}

export default RootLayout;
