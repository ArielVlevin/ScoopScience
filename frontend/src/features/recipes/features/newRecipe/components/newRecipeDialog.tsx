import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogClose,
  DialogDescription,
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
import { RecipeKind, typeOptions } from "@/types";
import { useLocation } from "react-router-dom";
import HandleTable from "./handleTable";
import { useRecipeForm } from "../hooks/useRecipeForm";

export default function NewRecipeDialog() {
  //
  const location = useLocation();
  const BASERECIPE = location.state || undefined;

  const {
    isOpen,
    setIsOpen,
    currentStep,
    handleNext,
    handleBack,
    formData,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    handleSubmit,
    rows,
    setRows,
    totals,
    setTotals,
  } = useRecipeForm(BASERECIPE);

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
          <DialogHeader>
            <DialogTitle>New Recipe</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          {/* Step 1 */}
          {currentStep === 1 && (
            <form className="grid gap-8">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Recipe Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter recipe name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
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
                  </div>
                </div>
                <div className="grid gap-2">
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
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </DialogFooter>
            </form>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <form className="grid gap-8">
              <div className="grid gap-4">
                <HandleTable
                  recipeKind={formData.recipeKind as RecipeKind}
                  rows={rows}
                  setRows={setRows}
                  totals={totals}
                  setTotals={setTotals}
                />
              </div>

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

          {/* Step 3 */}
          {currentStep === 3 && (
            <form className="grid gap-8">
              <div className="grid gap-4">
                <div className="grid gap-2">
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
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
                  </div>
                  <div className="grid gap-2">
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
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="photo" className="text-xl font-medium">
                    Photo
                  </Label>
                  <Input
                    id="photo"
                    /* type="string" */ onChange={handleInputChange}
                  />
                </div>
              </div>
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
