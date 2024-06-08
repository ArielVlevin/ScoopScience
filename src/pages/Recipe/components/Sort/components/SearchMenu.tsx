import { MenuItem, Box, Toolbar, AppBar,  TextField,  SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { RecipeData } from "../../../../../Types/recipe";
import recipes from "../../../../../data";
import SortSelect from "./SortSelect";

type SearchRecipeMenuProps = {
  onFilteredRecipesChange: (recipes: RecipeData[]) => void;
};

const ratingOptions = [1, 3, 3.5, 4, 4.5];
const typeOptions = ['gelato', 'ice cream', 'sorbet', 'other'];
const sortOptions = ['recipeName' , 'userName'];


const SearchRecipeMenu: React.FC<SearchRecipeMenuProps> = ({ onFilteredRecipesChange }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<'recipeName' | 'userName'>('recipeName');
  const [ratingFilter, setRatingFilter] = useState(1);

  useEffect(() => {
    const filteredRecipes = recipes
      .filter(recipe => 
        recipe.recipeName.toLowerCase().includes(nameFilter.toLowerCase()) &&
        recipe.recipeRating.ratingValue >= ratingFilter &&
        (typeFilter.length === 0 || typeFilter.includes(recipe.recipeIngredient.kind.toLowerCase()))
      )
      .sort((a, b) => 
        sortOption === 'recipeName' 
          ? a.recipeName.localeCompare(b.recipeName) 
          : a.user.userName.localeCompare(b.user.userName)
      );
    onFilteredRecipesChange(filteredRecipes);
  }, [nameFilter, typeFilter, sortOption, ratingFilter, onFilteredRecipesChange]);



  function handleSortOptionChange(event: SelectChangeEvent<'recipeName' | 'userName'>) {
    setSortOption(event.target.value as 'recipeName' | 'userName');
  };

  function handleRatingFilterChange(event: SelectChangeEvent<number>) {
    setRatingFilter(event.target.value as number);
  };

  function handleTypeFilterChange(event: SelectChangeEvent<typeof typeFilter>) {
    const { target: { value } } = event;
    setTypeFilter(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box>
      <AppBar position="static" elevation={0} sx={{ maxHeight: '65px', bgcolor: '#C38555D5' }}>
        <Toolbar>

        <TextField
            label='Search'
            variant="outlined"
            placeholder="Search ice cream"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
            sx={{ maxWidth: 200, marginLeft: 2, marginRight: 8 }}
          />

          <SortSelect 
            id="Sort by" 
            value={sortOption}  
            onChangeHandler={handleSortOptionChange} 
            options= {sortOptions.map((option, index) => (
              option==='recipeName'?
              <MenuItem key={index} value={option}>recipe name</MenuItem>
              :
              <MenuItem key={index} value={option}>user name</MenuItem>
            ))}
          />

          <SortSelect 
            id="Rating" 
            value={ratingFilter}  
            onChangeHandler={handleRatingFilterChange} 
            options = {ratingOptions.map((option, index) => (
              <MenuItem key={index} value={option}>{option}+</MenuItem>))}
          />

          <SortSelect 
            id="Type" 
            value={typeFilter}  
            onChangeHandler={handleTypeFilterChange} 
            options= {typeOptions.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>))}  
            multi
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchRecipeMenu;


/*       

<FormControl variant="outlined" sx={{ minWidth:100,maxWidth: 200, marginRight: 2 }}>
<InputLabel htmlFor="type-filter">Type</InputLabel>
<Select
  id="type-filter"
  value={typeFilter}
  multiple
  onChange={handleTypeFilterChange}
  label="Type"
>
  {typeOptions.map((option, index) => (
    <MenuItem key={index} value={option}>{option}</MenuItem>
  ))}
</Select>
</FormControl>


*/