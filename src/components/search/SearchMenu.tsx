import { CircularProgress, MenuItem, Box, Menu, Typography, Toolbar, AppBar } from "@mui/material";
import recipes from "../../data";
import FilterButton from "./FilterButton";
import MenuItems from "./MenuItems";
import RecipeList from "./RecipeList";
import { useEffect, useState } from "react";






export default function SearchRecipeMenu(){

   const [loading, setLoading] = useState(true);

   const [nameFilter, setNameFilter] = useState('');
   const [typeFilter, setTypeFilter] = useState('');
   const [sortOption, setSortOption] = useState<'recipeName' | 'userName'>('recipeName');
   const [ratingFilter, setRatingFilter] = useState(0);
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [ratingAnchorEl, setRatingAnchorEl] = useState<null | HTMLElement>(null);
   const [typeAnchorEl, setTypeAnchorEl] = useState<null | HTMLElement>(null);
 
   useEffect(() => {
      const timer = setTimeout(() => {setLoading(false);}, 150);
      return () => clearTimeout(timer);
    }, []);
    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      );
    }
  
   // Function to filter and sort recipes based on the selected filters and sort option
   const filteredRecipes = recipes.filter(recipe => {
       const nameFilterPassed = recipe.recipeName.toLowerCase().includes(nameFilter.toLowerCase());
       const ratingFilterPassed = recipe.recipeRating.ratingValue >= ratingFilter;
       const typeFilterPassed = typeFilter === '' || recipe.recipeIngredient.kind.toLowerCase() === typeFilter.toLowerCase();
       return nameFilterPassed && ratingFilterPassed && typeFilterPassed;
     })
     .sort((a, b) => {
       if (sortOption === 'recipeName') {
         return a.recipeName.localeCompare(b.recipeName);
       } else if (sortOption === 'userName') {
         return a.user.userName.localeCompare(b.user.userName);
       }
       return 0;
     });
 
   const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, menuType: string) => {
     if (menuType === 'sort') setAnchorEl(event.currentTarget);
     else if (menuType === 'rating') setRatingAnchorEl(event.currentTarget);
     else if (menuType === 'type') setTypeAnchorEl(event.currentTarget);
   };
 
   const handleMenuClose = () => {
     setAnchorEl(null);
     setRatingAnchorEl(null);
     setTypeAnchorEl(null);
   };
 
   const handleSortOptionChange = (option: 'recipeName' | 'userName') => {
     setSortOption(option);
     handleMenuClose();
   };
 
   const handleRatingFilterChange = (rating: number) => {
     setRatingFilter(rating);
     handleMenuClose();
   };
 
   const handleTypeFilterChange = (type: string) => {
     setTypeFilter(type);
     handleMenuClose();
   };



 
   const ratingOptions = [0, 3, 3.5, 4, 4.5];
   
   const typeOptions = ['', 'gelato', 'ice cream', 'sorbet','other'];

   type MenuItemValue = 'recipeName' | 'userName';
   const generateMenuItem = (label: string, value: MenuItemValue, onClick: (value: MenuItemValue) => void) => (
      <MenuItem key={value} onClick={() => onClick(value)}>
        {label}
      </MenuItem>
    );


   return(
      <Box>
         <AppBar position="static"  sx={{maxHeight: '80px', bgcolor:'#E49FE1D5'}}>
            <Toolbar>

               {/* Sort option button */}
               <FilterButton label="Sort Options" onClick={(event) => handleMenuOpen(event, 'sort')} isSelected={Boolean(sortOption)}/>
               
               <Menu id="sort-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose} >
                  {generateMenuItem('Sort by Recipe Name', 'recipeName', handleSortOptionChange)}
                  {generateMenuItem('Sort by Recipe User', 'userName', handleSortOptionChange)}
               </Menu>

               {/* Rating filter button */}
               <FilterButton label="Rating Filter" onClick={(event) => handleMenuOpen(event, 'rating')} isSelected={Boolean(ratingFilter)}/>
               <Menu id="rating-menu" anchorEl={ratingAnchorEl} keepMounted open={Boolean(ratingAnchorEl)} onClose={handleMenuClose}>
               <MenuItems options={ratingOptions} onClick={handleRatingFilterChange} />
               </Menu>

               {/* Type filter button */}
               <FilterButton label="Type Filter" onClick={(event) => handleMenuOpen(event, 'type')} isSelected={Boolean(typeFilter)}/>
               <Menu id="type-menu" anchorEl={typeAnchorEl} keepMounted open={Boolean(typeAnchorEl)} onClose={handleMenuClose}>
               <MenuItems options={typeOptions} onClick={handleTypeFilterChange} />
               </Menu>
               {/* Filter input fields */}
               <input type="text" placeholder="Search by name" value={nameFilter} onChange={e => setNameFilter(e.target.value)}
               />

            </Toolbar>
         </AppBar>
         <Typography variant="h5" gutterBottom alignItems='center'>
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
         </Typography>

         <RecipeList recipes={filteredRecipes} />
      </Box>
   );
}
