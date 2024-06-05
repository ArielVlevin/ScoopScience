import { useParams } from "react-router-dom";
import IngredientsTable from "../components/table/table";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { ListItemText, ListItemButton, Box, CircularProgress } from "@mui/material";

 

function RecipeDetailPage(){

   const params = useParams();

   
   const [open, setOpen] = useState(false);
   const [loading, setLoading] = useState(false); // Assuming you want to show loading when opening the table
 
   const toggleOpen = () => {
     setOpen(!open);
     if (open) {
       // Close table logic
     } else {
       setLoading(true);
       // Simulate loading
       setTimeout(() => {
         setLoading(false);
       }, 150);
     }
   };
 
   return (
      <>
     <Box
       sx={{
         bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
         pb: open ? 2 : 0,
       }}
       mt={4}
     >
      <ListItemButton
         alignItems="flex-start"
         onClick={toggleOpen}
         sx={{
           px: 3,
           pt: 2.5,
           bgcolor: open ? 'gray ': 'darkgray',
           '&:hover, &:focus': { '& svg': { opacity: 1 } },
         }}
      >
      <ListItemText
           primary="Ingredient Table"
           primaryTypographyProps={{
            color: 'whitesmoke',
             fontSize: 15,
             fontWeight: 'bold',
             lineHeight: '16px',
             mb: '2px',
           }}

           sx={{ my: 0 }}
         />
         <KeyboardArrowDown
           sx={{
             mr: -1,
             opacity: 0,
             transform: open ? 'rotate(-180deg)' : 'rotate(0)',
             transition: '0.2s',
           }}
         />
      </ListItemButton>
      {open && (
         loading ? <CircularProgress /> : <IngredientsTable />
      )}
     </Box>

   </>
   );
}

export default RecipeDetailPage;