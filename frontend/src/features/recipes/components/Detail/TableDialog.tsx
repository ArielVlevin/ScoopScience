import NewRecipeTable from "../../components/Table/0table";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { useState } from "react";
import CustomButton from "../Card/CustomButton";
import { Recipe } from "@/types";

type TableDialogProps = {
  recipe: Recipe;
};
export function TableDialog({ recipe }: TableDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <CustomButton onClick={() => {}} color="blue">
          View Ingredient Table
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className=" pb-4">Ingredient Table</DialogTitle>
          <DialogDescription className=" ">
            <NewRecipeTable
              className="border rounded-lg border-gray-300 p-2 "
              rows={recipe.recipeIngredient.ingredients}
              isEditable={false}
              isTotalsVisible={false}
            />
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => setIsDialogOpen(false)} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
