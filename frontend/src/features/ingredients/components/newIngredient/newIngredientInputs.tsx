import React from "react";
import { Input, Label } from "@/components/ui";
import { NewIngredient } from "@/types";

interface NutritionalInputsProps {
  ingredient: NewIngredient;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NutritionalInputs: React.FC<NutritionalInputsProps> = ({
  ingredient,
  onChange,
}) => {
  return (
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
            value={ingredient[field as keyof NewIngredient] as number}
            onChange={onChange}
            required
          />
        </div>
      ))}
    </div>
  );
};

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameInput: React.FC<NameInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="name" className="text-lg">
        Name
      </Label>
      <Input id="name" name="name" value={value} onChange={onChange} required />
    </div>
  );
};

interface WeightInputProps {
  value: number;
}

export const WeightInput: React.FC<WeightInputProps> = ({ value }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="weight" className="text-lg">
        Weight (g)
      </Label>
      <Input
        id="weight"
        name="weight"
        type="number"
        disabled
        value={value}
        required
      />
    </div>
  );
};
