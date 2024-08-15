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
import { useRecipeForm } from "../../hooks/useRecipeForm";
import Grid from "@/components/class/grid";
import { Checkbox } from "@/components/ui";
import TotalsCard from "./totalsCard";
import { useState } from "react";
import AddIngredientToTable from "../recipeTable/AddIngredientToTable";
import NewRecipeTable from "../recipeTable/table";
import RecipeBulletCharts from "../recipeBulletChart";
import Page from "@/components/class/page";
import StepsProgressBar from "@/components/class/StepsProgresBar";
import FixedButtomBar from "@/components/class/fixedButtonBar";
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
  } = useRecipeForm();

  //
  const [isAddingIngredient, setIsAddingIngredient] = useState<boolean>(false);

  return (
    <Page>
      {/* Step 1 */}
      {currentStep === 1 && (
        <form className="gap-6 m-6 bg-muted rounded-lg p-6 mb-6 hover:scale-105 duration-500 h-full items-center justify-center">
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
          <Grid className="m-6">
            <div className="text-2xl font-bold text-primary mb-4 text-center">
              Recipe Detail
            </div>
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
        </form>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <form className="gap-6 m-6 bg-muted rounded-lg p-6 mb-6 hover:scale-105 duration-500 h-full items-center justify-center">
          <div className="text-3xl font-bold text-primary mb-4">New Recipe</div>
          <Separator className="mt-6 mb-6 " />
          <StepsProgressBar
            currentStep={currentStep}
            tasks={[
              { title: "Recipe Details" },
              { title: "Ingredients" },
              { title: "Recipe Details" },
              { title: "Review" },
            ]}
          />
          <Grid>
            <div className="text-2xl font-bold text-primary mb-4 text-center">
              Ingredients Table
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
        </form>
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <form className="gap-6 m-6 bg-muted rounded-lg p-6 mb-6 hover:scale-105 duration-500 h-full items-center justify-center">
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
          <Grid className="m-6">
            <div className="text-2xl font-bold text-primary mb-4 text-center">
              Recipe Detail
            </div>
            <Grid gap={2}>
              <Label htmlFor="instructions" className="text-xl font-medium">
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
                <Label htmlFor="cookingTime" className="text-sm font-medium">
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
        </form>
      )}

      {/* Step 4 */}
      {currentStep === 4 && (
        <form className="gap-6 m-6 bg-muted rounded-lg p-6 mb-6 hover:scale-105 duration-500 h-full items-center justify-center">
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
          <Grid className="m-6">
            <div className="text-2xl font-bold text-primary mb-4 text-center">
              Review
            </div>

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
              <Label htmlFor="recipeSummary" className="text-xl font-medium">
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
          </Grid>
        </form>
      )}
      {currentStep === 1 ? (
        <FixedButtomBar onClick={handleNext} btmText="Save and Continue" />
      ) : currentStep === 2 || currentStep === 3 ? (
        <FixedButtomBar
          onClick={handleNext}
          btmText="Save and Continue"
          scndBtmText="Back"
          scndBtmOnClick={handleBack}
        />
      ) : (
        <FixedButtomBar
          onClick={handleSubmit}
          btmText="Upload Recipe"
          scndBtmText="Back"
          scndBtmOnClick={handleBack}
        />
      )}
    </Page>
  );
}
