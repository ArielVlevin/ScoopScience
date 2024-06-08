import { FormControl, InputAdornment, MenuItem, Select, TextField,  SelectChangeEvent } from "@mui/material";
import { currencies } from "./Calculate";


 interface UnitControlProps {
  unit: string;
  handleUnitChange: (event: SelectChangeEvent<string>) => void;
  focused?: boolean;
}

export function UnitControl({unit, handleUnitChange} : UnitControlProps) {
  return (
    <FormControl sx={{ m: 1, width: '12ch' }}>
      <Select value={unit} onChange={handleUnitChange} displayEmpty >
        {currencies.map((option) => ( <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem> ))}
      </Select>
    </FormControl>
  );
}


interface RecipeTextFieldProps {
   label: string;
   value: number | string;
   unit: string;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   focused?: boolean;
 }
 

export default function RecipeTextField({ label, value, unit, onChange, focused=false }:RecipeTextFieldProps) {
  return (
    <FormControl sx={{ m: 1, width: '25ch' }}>
    <TextField
      label={label}
      id={label}
      value={value}
      onChange={onChange}
      focused={focused}
      InputProps={{
        readOnly: true,
        endAdornment: <InputAdornment position="end">{unit === 'grams' ? 'grams' : '%'}</InputAdornment>,
      }}
    />
  </FormControl>
  );
};


