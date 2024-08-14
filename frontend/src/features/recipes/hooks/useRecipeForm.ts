import { useState, useEffect, ChangeEvent } from "react";
import { RecipeKind, Row, Recipe, Allergies, Totals } from "@/types";
import calculateTotals from "../utils/calculateTotals";
import { postRecipe } from "@/features/recipes/services/postRecipe";
import { useGetRecipesByKind } from "./useGetRecipesByKind";
import { useNavigate } from "react-router-dom";
import { calculateAndRound } from "../utils/calculateAndRound";

export function useRecipeForm(
  initialRecipeKind: RecipeKind | undefined = "gelato"
) {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [totals, setTotals] = useState<Totals>(calculateTotals(rows));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAdditionalSelectVisible, setIsAdditionalSelectVisible] =
    useState(false);

  //
  //
  //
  //
  const [newTotalWeight, setNewTotalWeight] = useState<number>(
    totals.totalWeight
  );
  const [editTotalWeight, setEditTotalWeight] = useState<boolean>(false);
  //
  //
  //
  //
  const [formData, setFormData] = useState({
    name: "",
    user_id: "",
    description: "",
    recipeKind: initialRecipeKind,
    instructions: "",
    cookingTime: "",
    prepTime: "",
    image: "",
    isPublic: true,
    ingredients: undefined as Row[] | undefined,
    totals: undefined as Totals | undefined,
    allergies: undefined as Allergies | undefined,
  });

  const { recipes, isLoading, isError, error, refetch } = useGetRecipesByKind(
    formData.recipeKind
  );

  const setUserId = (user_id: string) => {
    setFormData((prevData) => ({ ...prevData, user_id }));
  };

  useEffect(() => {
    refetch();
  }, [formData.recipeKind, refetch]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: rows,
      totals: calculateTotals(rows),
    }));
  }, [rows, totals]);

  const handleNext = () => setCurrentStep(currentStep + 1);
  const handleBack = () => setCurrentStep(currentStep - 1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, files } = e.target as HTMLInputElement;
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

  const handleAdditionalSelectChange = (value: string) => {
    console.log("value:", value);
    const selectedRecipe = recipes.find(
      (recipe) => recipe.recipeData.recipeName === value
    );
    if (selectedRecipe) {
      setRows(selectedRecipe.recipeIngredient.ingredients);
      console.log("rows:", rows);
      setTotals(selectedRecipe.recipeIngredient.totalData);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      isPublic: checked,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  //
  //
  //

  const handleSaveEditTotalWeight = () => {
    if (newTotalWeight >= 1) {
      setRows(
        rows.map((row) => ({
          ...row,
          weight: calculateAndRound(
            row.weight,
            totals.totalWeight,
            newTotalWeight
          ),
          calories: calculateAndRound(
            row.calories,
            totals.totalWeight,
            newTotalWeight
          ),
          sugar: calculateAndRound(
            row.sugar,
            totals.totalWeight,
            newTotalWeight
          ),
          fat: calculateAndRound(row.fat, totals.totalWeight, newTotalWeight),
          protein: calculateAndRound(
            row.protein,
            totals.totalWeight,
            newTotalWeight
          ),
          msnf: calculateAndRound(row.msnf, totals.totalWeight, newTotalWeight),
        }))
      );
      setEditTotalWeight(false);
    } else alert("Please enter a valid value greater than 0 grams");
  };

  //
  //
  //
  //
  //
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.recipeKind ||
      !formData.description ||
      !formData.instructions ||
      !formData.cookingTime ||
      !formData.prepTime
    ) {
      alert("All fields are required");
      return;
    }

    const newRecipe: Recipe = {
      recipeData: {
        recipeName: formData.name,
        recipeKind: formData.recipeKind!,
        description: formData.description,
        instructions: formData.instructions,
        cookingTime: parseInt(formData.cookingTime),
        prepTime: parseInt(formData.prepTime),
        photo: "",
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
        allergies: formData.allergies!,
      },
    };

    try {
      const answer = await postRecipe(
        newRecipe,
        selectedFile,
        formData.user_id
      );
      navigate(`/recipes/${answer._id}`);
    } catch (error) {
      console.error("Error posting recipe:", error);
    }
    setIsOpen(false);
  };

  return {
    recipes,
    isAdditionalSelectVisible,
    isOpen,
    setIsOpen,
    setUserId,
    setIsAdditionalSelectVisible,
    currentStep,
    handleNext,
    handleBack,
    formData,
    handleInputChange,
    handleSelectChange,
    handleAdditionalSelectChange,
    handleSwitchChange,
    handleFileChange,
    handleSaveEditTotalWeight,
    handleSubmit,
    rows,
    setRows,
    totals,
    setTotals,
    isLoading,
    isError,
    error,
  };
}
