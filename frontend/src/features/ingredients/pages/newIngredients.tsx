import {
  Allergies,
  IngredientCategory,
  ingredientCategoryArray,
  NewIngredient,
} from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useState } from "react";
import { useAddIngredient } from "../hooks/useAddngredient";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Ingredient:", ingredient);
    addIngredientMutation.mutate(ingredient);
    // Here you would typically send the data to your backend or perform other actions
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>New Ingredient</CardTitle>
        <CardDescription>Add a new ingredient to your database</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (g)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              placeholder="100"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={ingredient.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {ingredientCategoryArray.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              "calories",
              "sugar",
              "fat",
              "saturates",
              "protein",
              "totalSolids",
              "msnf",
            ].map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  name={field}
                  type="number"
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Allergies</Label>
            <div className="flex flex-wrap gap-4">
              {Object.keys(ingredient.allergies).map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2">
                  <Checkbox
                    id={allergy}
                    checked={ingredient.allergies[allergy as keyof Allergies]}
                    onCheckedChange={() =>
                      handleAllergyChange(allergy as keyof Allergies)
                    }
                  />
                  <Label htmlFor={allergy}>
                    {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Add Ingredient</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddIngredientForm;
