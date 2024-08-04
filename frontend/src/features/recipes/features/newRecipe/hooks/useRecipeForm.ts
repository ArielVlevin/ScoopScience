import { useState, useEffect } from "react";
import { RecipeKind, Row, Recipe } from "@/types";
import calculateTotals from "../../../utils/calculateTotals";
import { Totals } from "../../../types/totalsTypes";
import { postRecipe } from "@/features/recipes/services/recipeService";

export function useRecipeForm(
  initialRecipeKind: RecipeKind | undefined = "gelato"
) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    recipeKind: initialRecipeKind,
    instructions: "",
    cookingTime: "",
    prepTime: "",
    photo: "",
    isPublic: true,
    ingredients: undefined as Row[] | undefined,
    totals: undefined as Totals | undefined,
  });
  const [rows, setRows] = useState<Row[]>([]);
  const [totals, setTotals] = useState<Totals>(calculateTotals(rows));

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: rows,
      totals: totals,
    }));
  }, [rows, totals]);

  const handleNext = () => setCurrentStep(currentStep + 1);
  const handleBack = () => setCurrentStep(currentStep - 1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, files } = e.target as HTMLInputElement; // Cast e.target to HTMLInputElement
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "file" ? files?.[0] || null : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      recipeKind: value as RecipeKind,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      isPublic: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe: Recipe = {
      recipeData: {
        recipeName: formData.name,
        recipeKind: formData.recipeKind!,
        description: formData.description,
        instructions: formData.instructions,
        cookingTime: parseInt(formData.cookingTime),
        prepTime: parseInt(formData.prepTime),
        photo: " ",
        isPublic: formData.isPublic,
      },
      recipeRating: {
        likes: 0,
        ratingValue: 0,
        ratingAmount: 0,
      },
      recipeIngredient: {
        recipeType: formData.recipeKind!,
        ingredients: formData.ingredients!,
        totalData: formData.totals!,
        specialMarks: {
          highSugar: false,
          subSugar: false,
          highFat: false,
          vegan: false,
          withEggs: false,
        },
      },
    };

    console.log("Transformed Recipe Data:", newRecipe);
    try {
      postRecipe(newRecipe);
    } catch (error) {
      console.error("Error posting recipe:", error);
    }
    setIsOpen(false); // Close the dialog after submission
  };

  return {
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
  };
}