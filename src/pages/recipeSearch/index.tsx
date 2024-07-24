
import SortRecipesBar from './components/bar/sortRecipesBar';
import RecipeCard from './components/card/cardsDisplay';


export default function RecipesPage() {

  return(
    <div  className='mt-10'>

      {/* ----Toolbar----- */}
      <div className='w-11/12 mx-auto'>
        <SortRecipesBar/>
      </div>


      {/* ----Cards----- */}
      <div className='container mx-auto'>
      <RecipeCard/>
      </div>
  
    </div>
  )
 }
 
