import { RatingWithAmount } from "@/components/class/rating";
import { Recipe } from "@/types";

type RecipeDataProps = {
  recipe: Recipe;
};
export const RecipeData: React.FC<RecipeDataProps> = ({ recipe }) => {
  return (
    <>
      <div className="flex justify-between items-center ">
        <h2 className="text-sm font-bold">{recipe.recipeData.recipeKind}</h2>
        <RatingWithAmount
          value={recipe.recipeRating.ratingValue}
          amount={recipe.recipeRating.ratingAmount}
        />
      </div>

      <div className="justify-between text-center">
        <h1 className="text-3xl font-bold ">{recipe.recipeData.recipeName}</h1>
        <p className="text-gray-700  ">{recipe.recipeData.description}</p>
      </div>
    </>
  );
};
