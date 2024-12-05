import { useEffect, useState } from "react";
import { Label } from "@/components/ui";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui";
import { Button } from "@/components/ui";

import ErrorPage from "@/pages/error";
import Loading from "@/pages/loading";
import { useGetRecipe } from "../../hooks/useGetRecipe";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "@/components/Text/title";
import { Separator } from "@/components/ui/separator";
import { updateRecipe } from "../../services/api";
import FixedButtomBar from "@/components/Button/fixedButtonBar";
import Page from "@/components/pages/page";
import { RecipeKind, typeOptions } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

export default function EditRecipeComponent() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("id");
  const recipe_id = parseInt(recipeId!, 10);

  const { recipe, isLoading, isError, error } = useGetRecipe(recipe_id);

  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [recipeKind, setRecipeKind] = useState<RecipeKind>("other");

  // New state variables
  const [cookingTime, setCookingTime] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [isPublic, setIsPublic] = useState(false);

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  useEffect(() => {
    if (recipe) {
      setRecipeName(recipe?.recipeData?.recipeName || "");
      setDescription(recipe?.recipeData?.description || "");
      setInstructions(recipe?.recipeData?.instructions || "");
      setCookingTime(recipe?.recipeData?.cookingTime || 0);
      setPrepTime(recipe?.recipeData?.prepTime || 0);
      setIsPublic(recipe?.recipeData?.isPublic || false);
      setRecipeKind(recipe?.recipeData?.recipeKind || "other");
      if (recipe?.recipeData?.photo) {
        setImageUrl(recipe?.recipeData?.photo || "");
        setShowDeleteButton(true);
      }
    }
  }, [recipe]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement | null>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setShowDeleteButton(true);
      setPhoto(file); // Save file for upload
    }
  };

  const handleDeleteImage = () => {
    setImageUrl("/placeholder.svg");
    setShowDeleteButton(false);
    setPhoto(null); // Clear file
  };

  //

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
    const recipeData = {
      recipeName,
      recipeKind,
      description,
      instructions,
      cookingTime,
      prepTime,
      isPublic,
    };

    try {
      const updatedRecipe = await updateRecipe(recipe_id, recipeData, photo);
      console.log("Recipe updated:", updatedRecipe);
      navigate(`/recipes/${recipe_id}`);
    } catch (error) {
      alert("Failed to update recipe");
      console.error("Failed to update recipe:", error);
    }
  };

  if (isNaN(recipe_id)) return <ErrorPage error="Invalid Recipe ID" />;
  if (isLoading) return <Loading />;
  if (isError && error) return <ErrorPage error={error?.message} />;

  return (
    <>
      <Page>
        <Title>Edit Recipe</Title>
        <Separator className="mb-4 mt-4" />

        <form className="grid gap-12 w-5/6 mx-auto mb-8 mt-8 ">
          <div className="grid gap-2">
            <Label htmlFor="name">Recipe Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter recipe name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="recipeKind">Recipe Kind</Label>
            <Select
              name="recipeKind"
              value={recipeKind}
              onValueChange={(value) => setRecipeKind(value as RecipeKind)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recipe kind" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              className="min-h-[150px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Enter instructions (one per step)"
              className="min-h-[200px]"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <Separator />

          <div className="flex justify-center items-center gap-20 ">
            <div className="grid gap-2 ">
              <Label htmlFor="cookingTime">Cooking Time</Label>
              <Input
                id="cookingTime"
                type="text"
                placeholder="Enter cooking time"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.valueAsNumber)}
              />
            </div>
            <div className="grid gap-2 ">
              <Label htmlFor="prepTime">Preparation Time</Label>
              <Input
                id="prepTime"
                type="number"
                placeholder="Enter preparation time"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.valueAsNumber)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="isPublic">Public Recipe</Label>
              <Input
                id="isPublic"
                className="w-4 h-4"
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                {showDeleteButton ? (
                  <div className="grid gap-2 justify-items-center">
                    <img
                      src={imageUrl}
                      alt="Recipe Image"
                      width={150}
                      height={150}
                      className="rounded-md"
                      style={{ aspectRatio: "150/150", objectFit: "cover" }}
                    />
                    <Button
                      className="mt-2 w-1/5 bg-red-500 text-white hover:bg-red-600"
                      onClick={handleDeleteImage}
                    >
                      Delete Image
                    </Button>
                  </div>
                ) : (
                  <Input
                    id="image"
                    type="file"
                    className="w-1/3"
                    onChange={handleImageUpload}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </Page>
      <FixedButtomBar onClick={handleSubmit} btmText="Save Recipe" />
    </>
  );
}
