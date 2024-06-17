import * as React from 'react';
import { Box, Button, Modal } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



interface MyModalProps {
   title: string;
 }

export default function MyModal({title}:MyModalProps) {

  const [open, setOpen] = React.useState(true);

 
   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };


   const handleCancel = () => {
      handleClose();
   };


 const onSubmit = () => {
   handleClose();
 };

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
      <Box sx={style}>
         <h1>{title}</h1>
         <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
         </Box>
      </Modal>
    </div>
  );
}


