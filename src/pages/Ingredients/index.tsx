import { Link } from "react-router-dom";
import { useGetIngredientsArray } from "../../hooks/useGetIngredient";
import { Button } from "@/components/ui/button";
import Loading from "@/layouts/loading";



export default function IngredientsPage(){

   const { ingredientsByCategory, isLoading, isError, error } = useGetIngredientsArray();

   
  if(isLoading) return <Loading />
   if (isError && error) return <div>Error: {error.message}</div>
   
   return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid gap-12">
        {Object.keys(ingredientsByCategory).map((category) => (
          <div key={category} className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold capitalize">{category}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 h-60">
              {ingredientsByCategory[category].map((ingredient) => (
                <Link
                  to={`/ingredients/${ingredient.id}`}
                  key={ingredient.id}
                  className="group"
                >
                  <div className="bg-muted rounded-lg overflow-hidden h-60 ">
                    <img
                      src={`http://localhost:3000/assets/ingredients/${ingredient.id}.jpeg`}
                      alt={ingredient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                      {ingredient.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <Link to={`/IngredientsCategory/${category}`} state={{ ingredients: ingredientsByCategory[category] }}>
            <Button variant="outline" className="w-full mt-4">
                See More {category}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}