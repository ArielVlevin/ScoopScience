"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type EditRecipeComponentProps = {
  recipeId: number;
};
export default function EditRecipeComponent({
  recipeId,
}: EditRecipeComponentProps) {
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40">
      <div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-8 md:p-12">
        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Recipe Name</Label>
            <Input id="name" type="text" placeholder="Enter recipe name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              placeholder="Enter ingredients (one per line)"
              className="min-h-[150px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Enter instructions (one per step)"
              className="min-h-[200px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg"
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
  );
}
