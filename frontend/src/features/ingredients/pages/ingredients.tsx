import { Link } from "react-router-dom";
import Loading from "@/pages/loading.tsx";
import ErrorPage from "@/pages/error.tsx";
import Page from "@/components/class/page";
import { useGetIngredientsArray } from "../hooks/useGetIngredientArray";
import Grid from "@/components/class/grid";
import { EllipsisIcon } from "lucide-react";
import Title from "@/components/class/title";
import { Separator } from "@/components/ui/separator";
import { categoryIcons } from "../types/icons";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui";
import IngredientCard from "../components/ingredientCard";

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
                    <div className="inline-block rounded-full bg-background p-4">
                      {categoryIcons[category as keyof typeof categoryIcons]}
                    </div>
                    <div
                      className="group flex flex-col items-center size-48 cursor-pointer"
                      key={ingredient._id}
                      onClick={() => openDialog(ingredient._id)}
                    >
                      <div className="mt-2 text-center">
                        <h3 className="text-lg font-medium group-hover:text-primary transition-colors hover:underline">
                          {ingredient.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
                {/* "See More" Button */}
                {ingredients.length > 7 && (
                  <div className="group flex flex-col items-center size-48 ml-2">
                    <Link
                      to={`/IngredientsCategory/${category}`}
                      state={{ ingredients: ingredientsByCategory[category] }}
                    >
                      <div className="inline-block rounded-full bg-background p-4 ">
                        <EllipsisIcon className="h-6 w-6 text-primary/80" />
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
