import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { ListItemText, ListItemButton, Box, CircularProgress } from "@mui/material";

 

function RecipeDetailPage(){


   
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
      <div>
      <div className="text-sm breadcrumbs pl-3 ">
  <ul>
    <li>
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className=" w-4 h-4 stroke-current "><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
         Home
      </a>
    </li> 
    <li>
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Documents
      </a>
    </li> 
    <li>
      <span className="inline-flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      Add Document
      </span>
    </li>
  </ul>
</div>

  <div className='p-4 pb-6 pt-6'>
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
         loading ? <CircularProgress /> : <p> add table to there</p>
      )}
     </Box>

   </div>
   </div>
   );
}

export default RecipeDetailPage;