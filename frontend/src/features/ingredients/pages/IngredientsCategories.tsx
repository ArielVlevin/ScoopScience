import Page from "@/components/class/page";
import { Dialog, DialogContent } from "@/components/ui";
import ErrorPage from "@/pages/error";
import { Ingredient } from "@/types";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import IngredientCard from "../components/ingredientCard";
import { categoryIcons } from "../types/icons";
import PageCard from "@/components/class/pageCard";

export default function IngredientsCategoryPage() {
  const { category } = useParams();
  const location = useLocation();
  const ingredients = (location.state?.ingredients as Ingredient[]) || [];

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

  if (!ingredients.length) {
    return <ErrorPage error="No ingredients found." />;
  }

  return (
    <Page>
      <PageCard title={category}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient._id}
              className="group flex flex-col items-center size-48"
            >
              <div className="inline-block rounded-full bg-background p-4">
                {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              <div
                className="group flex flex-col items-center size-48 cursor-pointer"
                key={ingredient._id}
                onClick={() => openDialog(ingredient._id as unknown as string)}
              >
                <div className="mt-2 text-center">
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors hover:underline">
                    {ingredient.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isDialogOpen && selectedIngredient && (
          <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DialogContent className="p-0 overflow-hidden  bg-gray-100">
              <IngredientCard _id={selectedIngredient} />
            </DialogContent>
          </Dialog>
        )}
      </PageCard>
    </Page>
  );
}
