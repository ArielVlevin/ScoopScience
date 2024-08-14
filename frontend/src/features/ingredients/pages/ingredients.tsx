import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loading from "@/pages/loading.tsx";
import ErrorPage from "@/pages/error.tsx";
import Page from "@/components/class/page";
import { useGetIngredientsArray } from "../hooks/useGetIngredientArray";
import { MilkIcon, NutIcon } from "@/components/icons/icon";
import Grid from "@/components/class/grid";
import {
  CandyIcon,
  CircleEllipsisIcon,
  CitrusIcon,
  DropletIcon,
} from "lucide-react";

export default function IngredientsPage() {
  const { ingredientsByCategory, isLoading, isError, error } =
    useGetIngredientsArray();

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page>
      <div className="grid gap-10">
        {Object.keys(ingredientsByCategory).map((category) => (
          <div key={category}>
            <div className="m-6 ml-6 mb-8">
              <h2 className="text-2xl font-bold capitalize">{category}</h2>
            </div>
            <Grid mdcols={4} gap={2}>
              {ingredientsByCategory[category].map((ingredient) => (
                <div className="group flex flex-col items-center size-48">
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
                  <Link
                    to={`/ingredients/${ingredient._id}`}
                    key={ingredient._id}
                  >
                    <div className="mt-2 text-center">
                      <h3 className="text-lg font-medium group-hover:text-primary transition-colors hover:underline">
                        {ingredient.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </Grid>
            <Link
              className="w-full"
              to={`/IngredientsCategory/${category}`}
              state={{ ingredients: ingredientsByCategory[category] }}
            >
              <Button variant="outline" className="w-full mt-8">
                See More {category}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Page>
  );
}
