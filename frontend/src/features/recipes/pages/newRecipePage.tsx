import { useState } from "react";
import { useRecipeForm } from "../hooks/useRecipeForm";
import PageCard from "@/components/class/pageCard";
import Grid from "@/components/class/grid";
import {
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  Checkbox,
  Switch,
} from "@/components/ui";
import AddIngredientToTable from "../components/recipeTable/AddIngredientToTable";
import NewRecipeTable from "../components/recipeTable/table";
import TotalsCard from "../components/newRecipe/totalsCard";
import RecipeBulletCharts from "../components/recipeBulletChart";
import RecipeRecipePreview from "../components/newRecipe/recipePreview";
import RequiredLabel from "@/components/class/requiredLabel";
import { typeOptions } from "@/types";
import RecipeLayout from "../components/newRecipe/layout";
import { Separator } from "@/components/ui/separator";

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

  const [isAddingIngredient, setIsAddingIngredient] = useState<boolean>(false);

  return (
    <form>
      <RecipeLayout
        currentStep={currentStep}
        isModalOpen={isModalOpen}
        onContinuePrevious={handleContinuePrevious}
        onNew={handleNew}
        onNext={handleNext}
        onBack={handleBack}
        handleSubmit={handleSubmit}
      >
        {currentStep === 1 && (
          <>
            <PageCard title="Recipe Details" className="mb-6">
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
                <RequiredLabel htmlFor="recipeKind">
                  Recipe Category
                </RequiredLabel>
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
            </PageCard>

            <PageCard title="Recipe Import">
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
                            recipe._id?.toString() ||
                            recipe.recipeData.recipeName
                          }
                        >
                          {recipe.recipeData.recipeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Grid>
              )}
            </PageCard>
          </>
        )}

        {currentStep === 2 && (
          <>
            <PageCard title="Table" className="mb-6">
              <NewRecipeTable
                className="border rounded-lg border-gray-300"
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
            </PageCard>
            {totals.totalWeight > 0 && (
              <>
                <PageCard title="Totals" className="mb-6">
                  <TotalsCard rows={rows} />
                </PageCard>
                <PageCard title="Stats">
                  <RecipeBulletCharts
                    recipeType={formData.recipeKind}
                    totals={totals}
                    height={90}
                  />
                </PageCard>
              </>
            )}
          </>
        )}

        {currentStep === 3 && (
          <>
            <PageCard title="Recipe Description" className="mb-6">
              <Grid gap={2}>
                <RequiredLabel htmlFor="description">Description</RequiredLabel>
                <Textarea
                  id="description"
                  placeholder="Enter a brief description of the recipe"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid gap={2}>
                <RequiredLabel htmlFor="instructions">
                  Instructions
                </RequiredLabel>
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
            </PageCard>
            <PageCard title="Photo">
              <Input type="file" onChange={handleFileChange} />
            </PageCard>
          </>
        )}

        {currentStep === 4 && (
          <PageCard title="Review">
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
            <Separator className="mt-6 mb-6" />
            <div className="grid gap-2">
              <Label htmlFor="recipeSummary" className="text-xl font-medium">
                Recipe Summary
              </Label>
              <div onClick={handleNext} className="cursor-pointer">
                click here to generate Recipe Preview
              </div>
            </div>
          </PageCard>
        )}

        {currentStep === 5 && <RecipeRecipePreview recipe={recipe} />}
      </RecipeLayout>
    </form>
  );
}
