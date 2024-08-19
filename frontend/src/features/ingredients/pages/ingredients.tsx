import { Link } from "react-router-dom";
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
  EllipsisIcon,
} from "lucide-react";
import Title from "@/components/class/title";
import { Separator } from "@/components/ui/separator";

export default function IngredientsPage() {
  const { ingredientsByCategory, isLoading, isError, error } =
    useGetIngredientsArray();

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page className="m">
      <Title>Explore Ingredients</Title>
      <Separator className="mt-6 mb-6" />

      <div className="grid gap-10">
        {Object.keys(ingredientsByCategory).map((category) => {
          const ingredients = ingredientsByCategory[category];
          const displayedIngredients = ingredients.slice(0, 7);

          return (
            <div key={category}>
              <div className="m-6 ml-6 mb-8">
                <h2 className="text-2xl font-medium capitalize font-sans ">
                  {category}
                </h2>
              </div>
              <Grid mdcols={4} gap={2}>
                {displayedIngredients.map((ingredient) => (
                  <div
                    className="group flex flex-col items-center size-48"
                    key={ingredient._id}
                  >
                    <div className="inline-block rounded-full bg-background p-4 ">
                      {category === "dairy" ? (
                        <MilkIcon className="size-24 text-blue-200" />
                      ) : category === "sugars" ? (
                        <CandyIcon className="size-24 text-red-500" />
                      ) : category === "stabilizer" ? (
                        <CandyIcon className="size-24 " />
                      ) : category === "fruits" ? (
                        <CitrusIcon className="size-24 text-green-300" />
                      ) : category === "nuts" ? (
                        <NutIcon className="size-24 text-orange-300" />
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
                {/* "See More" Button */}
                {ingredients.length > 7 && (
                  <div className="group flex flex-col items-center size-48">
                    <Link
                      to={`/IngredientsCategory/${category}`}
                      state={{ ingredients: ingredientsByCategory[category] }}
                    >
                      <div className="inline-block rounded-full bg-background p-4 ">
                        <EllipsisIcon className="size-24 text-primary/80" />
                      </div>
                      <div className="mt-2 text-center">
                        <h3 className="text-lg font-medium group-hover:text-primary transition-colors hover:underline">
                          See More
                        </h3>
                      </div>
                    </Link>
                  </div>
                )}
              </Grid>
            </div>
          );
        })}
      </div>
    </Page>
  );
}
