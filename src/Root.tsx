import { Outlet } from "react-router-dom";
import Navbar from "./layouts/nabvar";
import {Box, Divider } from "@mui/material";
import Footer from "./layouts/footer";
import { ThemeProvider } from "./layouts/ThemeProvider";

function RootLayout(){
   return <>
   <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
   <Navbar />
   <Box >
   <Divider />
   <Outlet/>
   <Footer />
   </Box>
   </ThemeProvider>
   </>;
}

export default RootLayout;
