import { useState, useEffect, ChangeEvent } from "react";
import {
  RecipeKind,
  Row,
  Recipe,
  Allergies,
  Totals,
  RecipeFormState,
} from "@/types";
import calculateTotals from "../utils/calculateTotals";
import { postRecipe } from "@/features/recipes/services/postRecipe";
import { useGetRecipesByKind } from "./useGetRecipesByKind";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import invalidInputToast from "@/components/class/inputToast";
import {
  MISSING_DATA_ERROR,
  MISSING_INGREDIENTS_ERROR,
  RECIPE_DESCRIPTION_ERROR,
  RECIPE_INSTRUCTIONS_ERROR,
  RECIPE_NAME_ERROR,
  TIME_ERROR,
  validateRecipeDescription,
  validateRecipeInstructions,
  validateRecipeName,
} from "../utils/validation";
import {
  clearLocalStorage,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

const STORAGE_KEY = "recipe_in_progress";

export function useRecipeForm(
  initialRecipeKind: RecipeKind | undefined = "gelato"
) {
  //
  const { user, isAuthenticated, setRecipeID } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) setUserId(user._id);
  }, [isAuthenticated, user]);

  //use State

  //modals
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const [userId, setUserId] = useState(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [isAdditionalSelectVisible, setIsAdditionalSelectVisible] =
    useState(false);

  //
  // form
  //
  const [currentStep, setCurrentStep] = useState(() => {
    return loadFromLocalStorage(STORAGE_KEY)?.currentStep || 1;
  });

  const [rows, setRows] = useState<Row[]>(() => {
    return loadFromLocalStorage(STORAGE_KEY)?.rows || [];
  });

  const [totals, setTotals] = useState<Totals>(() => {
    return loadFromLocalStorage(STORAGE_KEY)?.totals || calculateTotals(rows);
  });

  const [formData, setFormData] = useState(() => {
    return (
      loadFromLocalStorage(STORAGE_KEY)?.formData || {
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
      }
    );
  });

  //load recipes
  const { recipes, isLoading, isError, error, refetch } = useGetRecipesByKind(
    formData.recipeKind
  );

  useEffect(() => {
    const recipeFormState: RecipeFormState = {
      formData,
      rows,
      totals,
      currentStep,
    };
    saveToLocalStorage(STORAGE_KEY, recipeFormState);
  }, [formData, rows, totals, currentStep]);

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

  useEffect(() => {
    const storedRecipe = loadFromLocalStorage(STORAGE_KEY);
    if (storedRecipe) {
      setIsModalOpen(true);
    }
  }, []);

  const handleContinuePrevious = () => {
    setIsModalOpen(false);
  };

  const handleNew = () => {
    clearLocalStorage(STORAGE_KEY); // Clear the local storage

    setFormData({
      name: "",
      instructions: "",
      cookingTime: "",
      prepTime: "",
      image: "",
      isPublic: true,
      description: "",
      recipeKind: "gelato",
      ingredients: [],
      totals: undefined,
      allergies: undefined,
    });
    setRows([]);
    setTotals(calculateTotals([]));
    setCurrentStep(1);

    setIsModalOpen(false);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateRecipeName(formData.name)) {
        return invalidInputToast({
          description: RECIPE_NAME_ERROR,
        });
      }
    }

    if (currentStep === 2) {
      if (rows.length === 0) {
        return invalidInputToast({
          description: MISSING_INGREDIENTS_ERROR,
        });
      }
    }
    if (currentStep === 3) {
      if (!validateRecipeDescription(formData.description)) {
        return invalidInputToast({
          description: RECIPE_DESCRIPTION_ERROR,
        });
      }

      if (!validateRecipeInstructions(formData.instructions)) {
        return invalidInputToast({
          description: RECIPE_INSTRUCTIONS_ERROR,
        });
      }

      if (!formData.cookingTime || !formData.prepTime) {
        return invalidInputToast({ description: MISSING_DATA_ERROR });
      }

      if (formData.cookingTime.length > 3 || formData.prepTime.length > 3) {
        return invalidInputToast({
          description: TIME_ERROR,
        });
      }
    }
    setCurrentStep(currentStep + 1);
  };

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
      navigate("/auth");
      return null;
    }

    const newRecipe: Recipe = {
      user_id: { _id: userId },
      recipeData: {
        recipeName: formData.name,
        recipeKind: formData.recipeKind,
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
      clearLocalStorage(STORAGE_KEY);
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
    isModalOpen,
    handleContinuePrevious,
    handleNew,
  };
}
