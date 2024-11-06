import { Link } from "react-router-dom";
import Loading from "@/pages/loading.tsx";
import ErrorPage from "@/pages/error.tsx";
import { useGetIngredientsArray } from "../hooks/useGetIngredientArray";
import Grid from "@/components/class/grid";
import { EllipsisIcon } from "lucide-react";
import { getCategoryIcon } from "../types/icons";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui";
import IngredientCard from "../components/ingredientCard";
import Page from "@/components/class/page";
import PageCard from "@/components/class/pageCard";
import { IngredientCategory } from "../types";

export default function IngredientsPage() {
  const { ingredientsByCategory, isLoading, isError, error } =
    useGetIngredientsArray();

  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (ingredient: string) => {
    setSelectedIngredient(ingredient);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedIngredient("");
  };

  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page>
      <Grid gap={14}>
        {Object.keys(ingredientsByCategory).map((category) => {
          const ingredients = ingredientsByCategory[category];
          const displayedIngredients = ingredients.slice(0, 7);

          return (
            <PageCard key={category} title={category}>
              <Grid mdcols={4} gap={2}>
                {displayedIngredients.map((ingredient) => (
                  <div
                    className="group flex flex-col items-center size-48 cursor-pointer text-center"
                    key={ingredient._id}
                    onClick={() => openDialog(ingredient._id)}
                  >
                    <div className="inline-block rounded-full bg-primary hover:bg-primary/70 p-12">
                      {getCategoryIcon(category as IngredientCategory)}
                    </div>

                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors hover:underline mt-2">
                      {ingredient.name}
                    </h3>
                  </div>
                ))}
                {/* "See More" Button */}
                {ingredients.length > 7 && (
                  <Link
                    className="flex flex-col items-center size-48 text-center"
                    to={`/IngredientsCategory/${category}`}
                    state={{
                      ingredients: ingredientsByCategory[category],
                    }}
                  >
                    <div className="inline-block rounded-full bg-primary hover:bg-primary/70 p-12 ">
                      <EllipsisIcon className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors hover:underline mt-2">
                      See More
                    </h3>
                  </Link>
                )}
              </Grid>
            </PageCard>
          );
        })}
      </Grid>
      {isDialogOpen && selectedIngredient && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogContent className="p-0 overflow-hidden  bg-gray-100">
            <IngredientCard _id={selectedIngredient} />
          </DialogContent>
        </Dialog>
      )}
    </Page>
  );
}
