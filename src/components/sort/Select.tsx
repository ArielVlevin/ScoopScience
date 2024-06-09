import React from 'react';
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';


interface SortSelectProps {
  id: string;
  value: any;
  onChangeHandler: (event: SelectChangeEvent<any>) => void;
  options: React.ReactNode;
  multi?: boolean;
}

export default function SortSelect({ id, value, onChangeHandler, options, multi=false}: SortSelectProps){
return(
  <FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>
    <InputLabel htmlFor={id}>{id}</InputLabel>
    <Select
      id={id} value={value} onChange={onChangeHandler} label={id} multiple={multi} 
    >
      {options}
    </Select>
</FormControl>

);
};


//renderValue={(selected) => (selected as string[]).join(', ')}