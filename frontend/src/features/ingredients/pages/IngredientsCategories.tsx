import Page from "@/components/class/page";
import { MilkIcon } from "@/components/icons/icon";
import ErrorPage from "@/pages/error";
import { Ingredient } from "@/types";
import {
  CandyIcon,
  CircleEllipsisIcon,
  CitrusIcon,
  DropletIcon,
  NutIcon,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function IngredientsCategoryPage() {
  const { category } = useParams();
  const location = useLocation();
  const ingredients = (location.state?.ingredients as Ingredient[]) || [];

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
            className="group flex flex-col items-center size-48"
          >
            <div className="binline-block rounded-full bg-muted p-4 ">
              {category === "dairy" ? (
                <MilkIcon className="size-24 text-blue-300" />
              ) : category === "sugars" ? (
                <CandyIcon className="size-24 text-blue-300" />
              ) : category === "stabilizer" ? (
                <CandyIcon className="size-24 text-blue-300" />
              ) : category === "fruits" ? (
                <CitrusIcon className="size-24 text-blue-300" />
              ) : category === "nuts" ? (
                <NutIcon className="size-24 text-blue-300" />
              ) : category === "liquid" ? (
                <DropletIcon className="size-24 text-blue-300" />
              ) : (
                <CircleEllipsisIcon className="size-24 text-blue-300" />
              )}
            </div>
            <Link to={`/ingredients/${ingredient._id}`} key={ingredient._id}>
              <div className="mt-2 text-center">
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors hover:underline">
                  {ingredient.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Page>
  );
}
