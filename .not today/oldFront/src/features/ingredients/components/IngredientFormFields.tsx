import { Controller, Control } from "react-hook-form";
import { Ingredient, ingredientCategoryArray } from "@/types";

interface IngredientFormFieldsProps {
  control: Control<Ingredient>;
}

export const IngredientFormFields: React.FC<IngredientFormFieldsProps> = ({
  control,
}) => <></>; /* (
  <>
    <FormControl
      variant="outlined"
      sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextField {...field} label="Name" />}
      />
    </FormControl>

    <FormControl
      variant="outlined"
      sx={{ minWidth: 200, maxWidth: 200, marginRight: 2 }}
    >
      <InputLabel htmlFor="category">Category</InputLabel>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select {...field} label="Category">
            {ingredientCategoryArray.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>

    <FormControl
      variant="outlined"
      sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}
    >
      <Controller
        name="calories"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Calories" type="number" />
        )}
      />
    </FormControl>

    <FormControl
      variant="outlined"
      sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}
    >
      <Controller
        name="fat"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Fat" type="number" />
        )}
      />
    </FormControl>

    <FormControl
      variant="outlined"
      sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}
    >
      <Controller
        name="protein"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Protein" type="number" />
        )}
      />
    </FormControl>

    <FormControl
      variant="outlined"
      sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}
    >
      <Controller
        name="sugar"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Sugar" type="number" />
        )}
      />
    </FormControl>

    <FormControl
      variant="outlined"
      sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}
    >
      <Controller
        name="totalSolids"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Solids Percentage" type="number" />
        )}
      />
    </FormControl>

    <FormControl
      variant="outlined"
      sx={{ minWidth: 100, maxWidth: 200, marginRight: 2 }}
    >
      <Controller
        name="msnf"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="MSNF" type="number" />
        )}
      />
    </FormControl>
  </>
);
*/
