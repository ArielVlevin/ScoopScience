import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { typeOptions } from "@/types";
import { useLocation } from "react-router-dom";
import { useRecipeForm } from "../../hooks/useRecipeForm";
import Grid from "@/components/class/grid";
import { Checkbox } from "@/components/ui";
import TotalsCard from "./totalsCard";
import { useEffect, useState } from "react";
import AddIngredientToTable from "../recipeTable/AddIngredientToTable";
import NewRecipeTable from "../recipeTable/table";
import RecipeBulletCharts from "../recipeBulletChart";
import { useAuth } from "@/contexts/AuthContext";

export default function NewRecipeDialog() {
  //

  const location = useLocation();
  const BASERECIPE = location.state || undefined;
  const {
    recipes,
    isOpen,
    isAdditionalSelectVisible,
    setIsOpen,
    setUserId,
    setIsAdditionalSelectVisible,
    currentStep,
    handleNext,
    handleBack,
    formData,
    handleInputChange,
    handleAdditionalSelectChange,
    handleFileChange,
    handleSelectChange,
    handleSwitchChange,
    handleSubmit,
    rows,
    setRows,
    totals,
    setTotals,
  } = useRecipeForm(BASERECIPE);

  //
  //
  const [isAddingIngredient, setIsAddingIngredient] = useState<boolean>(false);

  const { user, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated && user) setUserId(user._id);
  }, [isAuthenticated]);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create New Recipe</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="fixed inset-0 bg-black/30" />
        <DialogContent
          className="sm:max-w-6xl"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          {/* Step 1 */}
          {currentStep === 1 && (
            <form className="gap-6">
              <Grid className="">
                <DialogHeader>
                  <DialogTitle>Recipe Detail</DialogTitle>
                </DialogHeader>
                <Grid gap={2}>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Recipe Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter recipe name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid gap={2}>
                  <Label htmlFor="recipeKind" className="text-sm font-medium">
                    Recipe Kind
                  </Label>
                  <Select
                    name="recipeKind"
                    value={formData.recipeKind}
                    onValueChange={handleSelectChange}
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
                </Grid>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={isAdditionalSelectVisible}
                    onCheckedChange={(checked) =>
                      setIsAdditionalSelectVisible(checked as boolean)
                    }
                  />
                  <Label className="text-sm font-medium">
                    Import ice cream base recipe
                  </Label>
                </div>
                {isAdditionalSelectVisible && (
                  <Grid gap={2}>
                    <Label
                      htmlFor="additionalSelect"
                      className="text-sm font-medium"
                    >
                      {formData.recipeKind} Recipes
                    </Label>
                    <Select
                      name="additionalSelect"
                      onValueChange={handleAdditionalSelectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select additional option" />
                      </SelectTrigger>
                      <SelectContent>
                        {recipes.map((recipe) => (
                          <SelectItem
                            key={recipe._id}
                            value={recipe.recipeData.recipeName}
                          >
                            {recipe.recipeData.recipeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Grid>
                )}
              </Grid>
              <DialogFooter className="mt-6">
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </DialogFooter>
            </form>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <form className="">
              <Label className="text-lg font-medium">Ingredients Table</Label>
              <NewRecipeTable
                className="border rounded-lg border-gray-300 "
                rows={rows}
                setRows={setRows}
                setTotals={setTotals}
              />
              <div className="flex justify-center w-full mt-2">
                <AddIngredientToTable
                  rows={rows}
                  setRows={setRows}
                  setIsAddingIngredient={setIsAddingIngredient}
                  isAddingIngredient={isAddingIngredient}
                />
              </div>
              <Label className="text-lg font-medium ">Totals</Label>
              {totals.totalWeight > 0 ? (
                <>
                  <TotalsCard className="w-full mt-2 mb-6" totals={totals} />
                  <RecipeBulletCharts
                    recipeType={formData.recipeKind}
                    totals={totals}
                    width={1125}
                    height={80}
                  />
                </>
              ) : null}

              <DialogFooter className="mt-6">
                <Button type="button" onClick={handleBack}>
                  Previous
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </DialogFooter>
            </form>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <form className="grid gap-8">
              <Grid gap={4}>
                <Grid gap={2}>
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter a brief description of the recipe"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid gap={2}>
                  <Label htmlFor="instructions" className="text-xl font-medium">
                    Instructions
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Enter step-by-step instructions"
                    rows={6}
                    value={formData.instructions}
                    onChange={handleInputChange}
                  />
                </Grid>
                <div className="grid grid-cols-2 gap-4">
                  <Grid gap={2}>
                    <Label
                      htmlFor="cookingTime"
                      className="text-sm font-medium"
                    >
                      Cooking Time(minutes)
                    </Label>
                    <Input
                      id="cookingTime"
                      type="number"
                      placeholder="30"
                      value={formData.cookingTime}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid gap={2}>
                    <Label htmlFor="prepTime" className="text-sm font-medium">
                      Preparation Time(minutes)
                    </Label>
                    <Input
                      id="prepTime"
                      type="number"
                      placeholder="15"
                      value={formData.prepTime}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </div>
                <Grid gap={2}>
                  <Label htmlFor="photo" className="text-xl font-medium">
                    Photo
                  </Label>
                  <input type="file" id="photo" onChange={handleFileChange} />
                </Grid>
              </Grid>
              <DialogFooter>
                <Button type="button" onClick={handleBack}>
                  Previous
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </DialogFooter>
            </form>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <form className="grid gap-8">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="isPublic" className="text-sm font-medium">
                    Make recipe public?
                  </Label>
                  <Switch
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="recipeSummary"
                    className="text-xl font-medium"
                  >
                    Recipe Summary
                  </Label>
                  <p>
                    Name: {formData.name}
                    <br />
                    Category: {formData.recipeKind}
                    <br />
                    Cooking Time: {formData.cookingTime}
                    <br />
                    Preparation Time: {formData.prepTime}
                    <br />
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleBack}>
                  Previous
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                  Save Recipe
                </Button>
              </DialogFooter>
            </form>
          )}

          <DialogClose />
        </DialogContent>
      </Dialog>
    </>
  );
}
