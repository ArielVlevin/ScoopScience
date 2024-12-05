import { Allergies, IngredientCategory, NewIngredient } from "@/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddIngredient } from "../hooks/useAddngredient";
import IngredientSearch from "../components/newIngredient/searchIngredient";
import { FoodItem } from "../types/searchInredientType";
import { Separator } from "@/components/ui/separator";

import AllergyCheckboxes from "../components/newIngredient/allergyCheckBox";
import CategorySelect from "../components/newIngredient/categorySelect";
import {
  NameInput,
  NutritionalInputs,
  WeightInput,
} from "../components/newIngredient/newIngredientInputs";
import PageCard from "@/components/pages/pageCard";
import Page from "@/components/pages/page";

const AddIngredientForm = () => {
  const [ingredient, setIngredient] = useState<NewIngredient>({
    name: "",
    weight: 100,
    category: "other",
    calories: 0,
    sugar: 0,
    fat: 0,
    saturates: 0,
    protein: 0,
    totalSolids: 0,
    msnf: 0,
    allergies: {
      milk: false,
      nuts: false,
      egg: false,
      soy: false,
      wheat: false,
    },
  });

  const addIngredientMutation = useAddIngredient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setIngredient((prev: NewIngredient) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleCategoryChange = (value: IngredientCategory) => {
    setIngredient((prev: NewIngredient) => ({ ...prev, category: value }));
  };

  const handleAllergyChange = (allergyName: keyof Allergies) => {
    setIngredient((prev: NewIngredient) => ({
      ...prev,
      allergies: {
        ...prev.allergies,
        [allergyName]: !prev.allergies[allergyName],
      },
    }));
  };

  const handleSelectIngredient = (selectedIngredient: FoodItem) => {
    setIngredient({
      ...ingredient,
      name: selectedIngredient.product_name || "",
      weight: 100,
      calories: selectedIngredient.nutriments?.["energy-kcal_100g"] || 0,
      sugar: selectedIngredient.nutriments?.sugars_100g || 0,
      fat: selectedIngredient.nutriments?.fat_100g || 0,
      saturates: selectedIngredient.nutriments?.["saturated-fat_100g"] || 0,
      protein: selectedIngredient.nutriments?.proteins_100g || 0,
      //todo: add totalSolids and msnf - use the calc
      totalSolids: 0,
      msnf: 0,
      allergies: {
        milk: false,
        nuts: false,
        egg: false,
        soy: false,
        wheat: false,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Ingredient:", ingredient);
    addIngredientMutation.mutate(ingredient);
  };

  return (
    <Page>
      <IngredientSearch
        onSelectIngredient={handleSelectIngredient}
        className="mb-10"
      />

      <form onSubmit={handleSubmit}>
        <PageCard
          title="New Ingredient Data"
          cardFooter={<Button type="submit">Send</Button>}
        >
          {/* Name Input */}
          <NameInput value={ingredient.name} onChange={handleInputChange} />

          {/* Category Select */}
          <CategorySelect
            value={ingredient.category}
            onChange={handleCategoryChange}
          />
          <Separator className="my-4" />
          {/* Weight Input */}
          <WeightInput value={ingredient.weight} />
          {/*Nutritional Inputs */}
          <NutritionalInputs
            ingredient={ingredient}
            onChange={handleInputChange}
          />

          <Separator className="my-4" />

          {/* Allergy Checkboxes */}
          <AllergyCheckboxes
            allergies={ingredient.allergies}
            onChange={handleAllergyChange}
          />
        </PageCard>
      </form>
    </Page>
  );
};

export default AddIngredientForm;
