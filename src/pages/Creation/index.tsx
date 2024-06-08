import {Box, Button, Container, Input } from "@mui/material";
import ImportIcon from '@mui/icons-material/ImportContacts';
import AddIcon from '@mui/icons-material/Add';



export default function CreationPage(){



   return(
   <Container >
   <h1>creation page</h1>
   <Box   display='flex'  alignItems='normal' sx={{}}>
   <Button variant="contained" startIcon={<AddIcon/>} sx={{margin:2}}>New Recipe</Button>
   <Button variant="contained" startIcon={<ImportIcon/>} sx={{margin:2}}>Import Recipe</Button>
   </Box>
   </Container>
   );
}
