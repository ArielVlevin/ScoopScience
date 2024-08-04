import Page from "@/components/class/page";
import ErrorPage from "@/pages/error";
import { Ingredient } from "@/types";
import { Link, useLocation, useParams } from "react-router-dom";

export default function IngredientsCategoryPage() {
  const { category } = useParams();
  const location = useLocation();
  const ingredients = (location.state?.ingredients as Ingredient[]) || []; // call the fetch function again

  if (!ingredients.length) {
    return <ErrorPage error="No ingredients found." />;
  }

  return (
    <Page>
      <h2 className="text-2xl font-bold capitalize mb-6">{category}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient._id}
            className="bg-muted rounded-lg overflow-hidden"
          >
            <Link
              to={`/ingredients/${ingredient._id}`}
              key={ingredient._id}
              className="group"
            >
              <img
                loading="lazy"
                src={`http://localhost:3000/assets/ingredients/${ingredient._id}.jpeg`}
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
    </Page>
  );
}
