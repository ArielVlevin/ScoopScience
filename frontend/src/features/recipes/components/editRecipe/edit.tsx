import Page from "@/components/class/page";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRecipe } from "../../hooks/useGetRecipe";
import ErrorPage from "@/pages/error";
import Loading from "@/pages/loading";
import RecipeHeader from "../recipeDetail/recipeHeader";
import NewRecipeTable from "../recipeTable/table";
import RecipeInstructions from "../recipeDetail/recipeInstructions";
import { Row, Totals } from "@/types";
import { useEffect, useState } from "react";
import calculateTotals from "../../calc/calculateTotals";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { Trash2Icon } from "lucide-react";

import { deleteRecipe } from "../../services/api";
import { useAuth } from "@/contexts/AuthContext";

export default function EditRecipe() {
  //
  //
  //
  const [imageUrl, setImageUrl] = useState("/placeholder.svg");
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  //
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement | null>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setShowDeleteButton(true);
    }
  };
  //
  const handleDeleteImage = () => {
    setImageUrl("/placeholder.svg");
    setShowDeleteButton(false);
  };

  //
  //
  //

  //
  const { user, updateUserRecipes } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("id");
  const recipe_id = parseInt(recipeId!, 10);

  const [tempoRows, setTempoRows] = useState<Row[]>([]);
  const [tempoTotals, setTempoTotals] = useState<Totals>(calculateTotals([]));

  const { recipe, isLoading, isError, error } = useGetRecipe(recipe_id);

  useEffect(() => {
    if (
      recipe &&
      recipe.recipeIngredient &&
      recipe.recipeIngredient.ingredients
    ) {
      setTempoRows(recipe.recipeIngredient.ingredients);
      setTempoTotals(calculateTotals(recipe.recipeIngredient.ingredients));
    }
  }, [recipe]);

  const handleDelete = async () => {
    if (!user || user._id !== recipe.user_id?._id) return;
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the recipe "${recipe.recipeData.recipeName}"?`
      );
      if (!confirmDelete) return;

      await deleteRecipe(recipe_id);
      updateUserRecipes(recipe_id, "remove");
      alert("Recipe deleted successfully.");
      navigate("/user/recipes");
    } catch (error) {
      alert("Failed to delete the recipe. Please try again.");
    }
  };

  if (isNaN(recipe_id)) return <ErrorPage error="Invalid Recipe ID" />;
  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <Page>
      <div className="mb-6 flex justify-end">
        <Button onClick={handleDelete} variant="destructive">
          <Trash2Icon className="size-5 mr-2" />
          Delte Recipe
        </Button>
      </div>
      <RecipeHeader recipe={recipe} />

      <NewRecipeTable
        className="border rounded-lg border-gray-300 mt-8 mb-8 "
        rows={tempoRows}
        setRows={setTempoRows}
        totals={tempoTotals}
        setTotals={setTempoTotals}
        isEditable={false}
      />

      <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
        <div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-8 md:p-12">
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Recipe Name</Label>
              <Input
                id="name"
                type="text"
                value={recipe?.recipeData.recipeName}
                placeholder="Enter recipe name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={recipe?.recipeData.description}
                placeholder="Enter description"
                className="min-h-[150px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={recipe?.recipeData.instructions}
                placeholder="Enter instructions (one per step)"
                className="min-h-[200px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center gap-4">
                <img
                  src={"show image"}
                  alt="Recipe Image"
                  width={150}
                  height={150}
                  className="rounded-md"
                  style={{ aspectRatio: "150/150", objectFit: "cover" }}
                />
                <div className="flex-1">
                  <Input id="image" type="file" onChange={handleImageUpload} />
                  {showDeleteButton && (
                    <Button
                      variant="destructive"
                      className="mt-2"
                      onClick={handleDeleteImage}
                    >
                      Delete Image
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save Recipe
            </Button>
          </form>
        </div>
      </div>
    </Page>
  );
}
