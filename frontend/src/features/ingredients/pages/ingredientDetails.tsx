import { useParams } from "react-router-dom";
import useGetIngredient from "../hooks/useGetIngredient";

import Page from "@/components/class/page";
import ErrorPage from "@/pages/error";
import Loading from "@/pages/loading";
import { MilkIcon, NutIcon } from "@/components/icons/icon";
import {
  CandyIcon,
  CitrusIcon,
  DropletIcon,
  CircleEllipsisIcon,
} from "lucide-react";

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
          <div className="binline-block rounded-full bg-muted p-4 ">
            {ingredientData.category === "dairy" ? (
              <MilkIcon className="size-24 text-blue-300" />
            ) : ingredientData.category === "sugars" ? (
              <CandyIcon className="size-24 text-blue-300" />
            ) : ingredientData.category === "stabilizer" ? (
              <CandyIcon className="size-24 text-blue-300" />
            ) : ingredientData.category === "fruits" ? (
              <CitrusIcon className="size-24 text-blue-300" />
            ) : ingredientData.category === "nuts" ? (
              <NutIcon className="size-24 text-blue-300" />
            ) : ingredientData.category === "liquid" ? (
              <DropletIcon className="size-24 text-blue-300" />
            ) : (
              <CircleEllipsisIcon className="size-24 text-blue-300" />
            )}
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
