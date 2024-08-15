import { useState, useEffect, ChangeEvent } from "react";
import { RecipeKind, Row, Recipe, Allergies, Totals } from "@/types";
import calculateTotals from "../utils/calculateTotals";
import { postRecipe } from "@/features/recipes/services/postRecipe";
import { useGetRecipesByKind } from "./useGetRecipesByKind";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function useRecipeForm(
  initialRecipeKind: RecipeKind | undefined = "gelato"
) {
  const { user, isAuthenticated, setRecipeID } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) setUserId(user._id);
  }, [isAuthenticated, user]);

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const [userId, setUserId] = useState(0);

  const [rows, setRows] = useState<Row[]>([]);

  const [totals, setTotals] = useState<Totals>(calculateTotals(rows));

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const [isAdditionalSelectVisible, setIsAdditionalSelectVisible] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
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
  const handleSetRecipe = (): Recipe | null => {
    if (!userId) {
      alert("You must be logged in to create a recipe");
      return null;
    }
    if (
      !formData.name ||
      !formData.recipeKind ||
      !formData.description ||
      !formData.instructions ||
      !formData.cookingTime ||
      !formData.prepTime
    ) {
      alert("All fields are required");
      return null;
    }

    const newRecipe: Recipe = {
      user_id: userId,
      recipeData: {
        recipeName: formData.name,
        recipeKind: formData.recipeKind!,
        description: formData.description,
        instructions: formData.instructions,
        cookingTime: parseInt(formData.cookingTime, 10),
        prepTime: parseInt(formData.prepTime, 10),
        photo: "",
        isPublic: true, // TODO: change to formData.isPublic
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
        allergies: {
          milk: true,
          nuts: false,
          egg: false,
          soy: false,
          wheat: false,
        },
      },
    };

    return newRecipe;
  };

  const handleRecipePreview = () => {
    const newRecipe = handleSetRecipe();
    if (newRecipe) {
      setRecipe(newRecipe);
      alert("Recipe preview successfully created");
    } else {
      alert("Error with creating recipe preview, try again");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe = handleSetRecipe();
    if (!newRecipe) return alert("Error with the recipe, try again");
    try {
      const answer = await postRecipe(newRecipe, selectedFile);
      setRecipeID(answer._id);
      navigate(`/recipes/${answer._id}`);
    } catch (error) {
      console.error("Error posting recipe:", error);
      alert("Error posting recipe");
      throw error;
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
    handleSubmit,
    rows,
    setRows,
    totals,
    setTotals,
    isLoading,
    isError,
    error,
    handleRecipePreview,
    recipe,
  };
}
