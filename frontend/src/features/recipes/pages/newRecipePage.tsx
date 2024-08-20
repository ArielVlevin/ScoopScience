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
import { useRecipeForm } from "../hooks/useRecipeForm";
import Grid from "@/components/class/grid";
import { Checkbox } from "@/components/ui";
import TotalsCard from "../components/newRecipe/totalsCard";
import { useState } from "react";
import AddIngredientToTable from "../components/recipeTable/AddIngredientToTable";
import NewRecipeTable from "../components/recipeTable/table";
import RecipeBulletCharts from "../components/recipeBulletChart";
import StepsProgressBar from "@/components/class/StepsProgresBar";
import FixedButtomBar from "@/components/class/fixedButtonBar";
import { Separator } from "@/components/ui/separator";
import RecipeRecipePreview from "../components/newRecipe/recipePreview";
import RequiredLabel from "@/components/class/requiredLabel";
import { ContinueRecipeModal } from "../components/newRecipe/continueModal";

export default function NewRecipe() {
  const {
    recipes,
    isAdditionalSelectVisible,
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
    recipe,
    isModalOpen,
    handleContinuePrevious,
    handleNew,
  } = useRecipeForm();

  //
  const [isAddingIngredient, setIsAddingIngredient] = useState<boolean>(false);

  return (
    <div className="container mx-auto ">
      {isModalOpen && (
        <ContinueRecipeModal
          isOpen={isModalOpen}
          onContinue={handleContinuePrevious}
          onNew={handleNew}
        />
      )}

      <form className="gap-6 m-6 bg-muted rounded-lg p-6 mb-6  h-full items-center justify-center drop-shadow-xl mt-16 mb-16">
        <div className="text-3xl font-bold text-primary mb-4">New Recipe</div>
        <Separator className="mt-6 mb-6 " />

        <StepsProgressBar
          currentStep={currentStep}
          tasks={[
            { title: "Recipe Details" },
            { title: "Ingredients" },
            { title: "Recipe Steps" },
            { title: "Review" },
          ]}
        />
        {/* Step 1 */}

        {currentStep === 1 && (
          <Grid className="m-6">
            <div className="text-2xl font-bold text-primary mb-4 text-center">
              Recipe Detail
            </div>
            <Grid gap={2}>
              <RequiredLabel htmlFor="name">Recipe Name</RequiredLabel>
              <Input
                id="name"
                placeholder="Enter recipe name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid gap={2}>
              <RequiredLabel htmlFor="recipeKind">Recipe Kind</RequiredLabel>
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
            <Separator className="mt-6 mb-6 " />
            <Label className="text-lg font-medium ">Import</Label>
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
                        value={
                          recipe._id?.toString() || recipe.recipeData.recipeName
                        }
                      >
                        {recipe.recipeData.recipeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Grid>
            )}
          </Grid>
        )}

        {/* Step 2 */}

        {currentStep === 2 && (
          <Grid className="m-6">
            <div className="text-2xl font-bold text-primary mb-4 text-center">
              Ingredients
            </div>
            <Label className="text-lg font-medium ">Table</Label>

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

            {totals.totalWeight > 0 ? (
              <>
                <Separator className="mt-6 mb-6 " />
                <Label className="text-lg font-medium ">Totals</Label>

                <TotalsCard className="w-full mt-2 mb-6" totals={totals} />
                <RecipeBulletCharts
                  recipeType={formData.recipeKind}
                  totals={totals}
                  width={1125}
                  height={80}
                />
              </>
            ) : null}
          </Grid>
        )}

        {/* Step 3 */}

        {currentStep === 3 && (
          <Grid className="m-6">
            <div className="text-2xl font-bold text-primary mb-4 text-center">
              Recipe Detail
            </div>
            <Grid gap={2}>
              <RequiredLabel htmlFor="instructions">Description</RequiredLabel>

              <Textarea
                id="description"
                placeholder="Enter a brief description of the recipe"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid gap={2}>
              <RequiredLabel htmlFor="instructions">Instructions</RequiredLabel>
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
                <RequiredLabel htmlFor="cookingTime">
                  Cooking Time(minutes)
                </RequiredLabel>
                <Input
                  id="cookingTime"
                  type="number"
                  placeholder="30"
                  value={formData.cookingTime}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid gap={2}>
                <RequiredLabel htmlFor="prepTime">
                  Preparation Time(minutes)
                </RequiredLabel>
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
        )}
        {/* Step 4 */}

        {currentStep === 4 && (
          <Grid className="m-6">
            <div className="text-2xl font-bold text-primary mb-4 text-center">
              Review
            </div>

            <div className="grid gap-2">
              <RequiredLabel htmlFor="isPublic">
                Make recipe public?
              </RequiredLabel>
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={handleSwitchChange}
              />
            </div>
            <Separator className="mt-6 mb-6 " />
            <div className="grid gap-2">
              <Label htmlFor="recipeSummary" className="text-xl font-medium">
                Recipe Summary
              </Label>
              <div onClick={handleNext} className="cursor-pointer">
                click here to generate Recipe Preview
              </div>
            </div>
          </Grid>
        )}
      </form>
      {currentStep === 5 && <RecipeRecipePreview recipe={recipe} />}
      {currentStep === 1 ? (
        <FixedButtomBar onClick={handleNext} btmText="Save and Continue" />
      ) : currentStep === 4 ? (
        <FixedButtomBar
          onClick={handleSubmit}
          btmText="Upload Recipe"
          scndBtmText="Back"
          scndBtmOnClick={handleBack}
        />
      ) : currentStep === 2 || currentStep === 3 ? (
        <FixedButtomBar
          onClick={handleNext}
          btmText="Save and Continue"
          scndBtmText="Back"
          scndBtmOnClick={handleBack}
        />
      ) : currentStep === 5 ? (
        <FixedButtomBar onClick={handleBack} btmText="Back" />
      ) : null}
    </div>
  );
}
