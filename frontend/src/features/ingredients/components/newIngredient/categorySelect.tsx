import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { IngredientCategory, ingredientCategoryArray } from "@/types";

interface CategorySelectProps {
  value: IngredientCategory;
  onChange: (value: IngredientCategory) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="category" className="text-lg">
        Category
      </label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as IngredientCategory)}
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
  );
};

export default CategorySelect;
