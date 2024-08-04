import { useParams } from "react-router-dom";
import useGetIngredient from "../hooks/useGetIngredient";

import Page from "@/components/class/page";
import ErrorPage from "@/pages/error";
import Loading from "@/pages/loading";

const IngredientDetailPage = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();

  const { ingredientData, isLoading, isError, error } = useGetIngredient(
    ingredientId || ""
  );

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page>
      {!isLoading && ingredientData ? (
        <div className="grid gap-2 m-4">
          <div className="bg-muted rounded-lg overflow-hidden size-60 ">
            <img
              src={`http://localhost:3000/assets/ingredients/${ingredientId}.jpeg`}
              alt={ingredientData.name}
            />
          </div>
          <div>
            <h2>{ingredientData.name}</h2>
            <p>Category: {ingredientData.category}</p>
            <p>Calories: {ingredientData.calories}</p>
            <p>Fat: {ingredientData.fat}</p>
            <p>Protein: {ingredientData.protein}</p>
            <p>Sugar: {ingredientData.sugar}</p>
            <p>Total Solids: {ingredientData.totalSolids}</p>
            <p>MSNF: {ingredientData.msnf}</p>
          </div>
        </div>
      ) : (
        <p>Ingredient not found</p>
      )}
    </Page>
  );
};

export default IngredientDetailPage;
