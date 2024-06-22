
import RecipeCard from './components/card/cardsDisplay';
import RecipeFilter from './components/Sort';

import SortRecipesBar from './sortRecipesBar';


export default function RecipesPage() {

  return(
    <div className='mt-10'>
      <SortRecipesBar/>

      <RecipeCard/>

      <div className='mt-40'>
        <RecipeFilter/>  
      </div>

   
    </div>
  )
 }
 
