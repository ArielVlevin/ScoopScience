

const handleFilterChange = (value: string | number, setter: React.Dispatch<React.SetStateAction<string | number>>, handleClose: () => void) => {
   setter(value);
   handleClose();
 };