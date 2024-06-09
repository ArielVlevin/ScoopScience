import { FormControl, InputAdornment, MenuItem, Select, TextField, SelectChangeEvent } from '@mui/material';
import { currencies } from "./Calculate";



interface UnitSelectProps {
  value?: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}
export function UnitSelect({value: selectedUnit, onChange: handleUnitChange}: UnitSelectProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: '6ch', maxWidth: '12ch' }}>
      <Select value={selectedUnit} defaultValue="grams" onChange={handleUnitChange}>
        {currencies.map((currency) => (
          <MenuItem key={currency.value} value={currency.value}>
            {currency.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}


interface RecipeTextFieldProps {
   label: string;
   value: number | string;
   unit?: string;
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
   isFocused?: boolean;
 }
 

export default function RecipeTextField({ label: fieldLabel, value: fieldValue, unit: fieldUnit = 'grams', onChange = () => {}, isFocused = false }: RecipeTextFieldProps) {
  const endAdornmentUnit = fieldUnit === 'grams' ? 'grams' : '%';

  return (
    <FormControl sx={{ m: 1, width: '22ch' }}>
      <TextField
        label={fieldLabel}
        id={fieldLabel}
        value={fieldValue}
        onChange={onChange}
        focused={isFocused}
        InputProps={{
          readOnly: true,
          endAdornment: <InputAdornment position="end">{endAdornmentUnit}</InputAdornment>,
        }}
      />
    </FormControl>
  );
};


