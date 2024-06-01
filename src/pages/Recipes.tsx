import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { CircularProgress, Menu, MenuItem } from '@mui/material';
import FilterButton from '../components/search/FilterButton';
import MenuItems from '../components/search/MenuItems';
import RecipeList from '../components/search/RecipeList';
import recipes from '../data';




const RecipesPage: React.FC = () => {
   const [loading, setLoading] = useState(true);

   const [nameFilter, setNameFilter] = useState('');
   const [typeFilter, setTypeFilter] = useState('');
   const [sortOption, setSortOption] = useState<'recipeName' | 'userName'>('recipeName');
   const [ratingFilter, setRatingFilter] = useState(0);
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [ratingAnchorEl, setRatingAnchorEl] = useState<null | HTMLElement>(null);
   const [typeAnchorEl, setTypeAnchorEl] = useState<null | HTMLElement>(null);
 
   useEffect(() => {
      // Simulate loading delay
      const timer = setTimeout(() => {
        setLoading(false);
      }, 150);
  
      // Clear timeout when component unmounts or when loading is done
      return () => clearTimeout(timer);
    }, []);
  
    // Rest of your component logic...
  
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

   return (
     <div>
       {/* Filter input fields */}
       <input
         type="text"
         placeholder="Filter by name"
         value={nameFilter}
         onChange={e => setNameFilter(e.target.value)}
       />
 
       {/* Sort option button */}
       <FilterButton
         label="Sort Options"
         onClick={(event) => handleMenuOpen(event, 'sort')}
         isSelected={Boolean(sortOption)}
       />
       
       <Menu
         id="sort-menu"
         anchorEl={anchorEl}
         keepMounted
         open={Boolean(anchorEl)}
         onClose={handleMenuClose}
       >
         {generateMenuItem('Sort by Recipe Name', 'recipeName', handleSortOptionChange)}
         {generateMenuItem('Sort by Recipe User', 'userName', handleSortOptionChange)}
       </Menu>
 
       {/* Rating filter button */}
       <FilterButton
         label="Rating Filter"
         onClick={(event) => handleMenuOpen(event, 'rating')}
         isSelected={Boolean(ratingFilter)}
       />
       <Menu
         id="rating-menu"
         anchorEl={ratingAnchorEl}
         keepMounted
         open={Boolean(ratingAnchorEl)}
         onClose={handleMenuClose}
       >
         <MenuItems options={ratingOptions} onClick={handleRatingFilterChange} />
       </Menu>
 
       {/* Type filter button */}
       <FilterButton
         label="Type Filter"
         onClick={(event) => handleMenuOpen(event, 'type')}
         isSelected={Boolean(typeFilter)}
       />
       <Menu
         id="type-menu"
         anchorEl={typeAnchorEl}
         keepMounted
         open={Boolean(typeAnchorEl)}
         onClose={handleMenuClose}
       >
         <MenuItems options={typeOptions} onClick={handleTypeFilterChange} />
       </Menu>
 
       <Typography variant="h5" gutterBottom>
         {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
       </Typography>
 
       <RecipeList recipes={filteredRecipes} />
     </div>
   );
 };
 
 export default RecipesPage;

