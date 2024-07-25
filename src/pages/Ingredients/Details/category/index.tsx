
  import { Ingredient } from '@/types/ingredient';
import { Link, useLocation, useParams } from 'react-router-dom';


  
  export default function IngredientsCategoryPage() {
    const { category } = useParams();
    const location = useLocation();
    const ingredients = location.state?.ingredients as Ingredient[] || []; // call the fetch function again
  
    if (!ingredients.length) {
      return <div>No ingredients found.</div>;
    }
 
  
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl font-bold capitalize mb-6">{category}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className="bg-muted rounded-lg overflow-hidden">
              <Link to={`/ingredients/${ingredient.id}`} key={ingredient.id} className="group" >
                <img
                  src={`http://localhost:3000/assets/ingredients/${ingredient.id}.jpeg`}
                  alt={ingredient.name}
                  className="w-full h-64 object-cover"
                />
                <div className="mt-2 text-center">
                  <h3 className="text-lg font-medium">{ingredient.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }  