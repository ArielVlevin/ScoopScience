import React from "react";
import { Checkbox, Label } from "@/components/ui";
import { Allergies } from "@/types";

interface AllergyCheckboxesProps {
  allergies: Allergies;
  onChange: (allergy: keyof Allergies) => void;
}

const AllergyCheckboxes: React.FC<AllergyCheckboxesProps> = ({
  allergies,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-lg">Allergies</Label>
      <div className="flex flex-wrap gap-4 ">
        {Object.keys(allergies).map((allergy) => (
          <div key={allergy} className="flex items-center space-x-1">
            <Checkbox
              id={allergy}
              checked={allergies[allergy as keyof Allergies]}
              onCheckedChange={() => onChange(allergy as keyof Allergies)}
            />
            <Label htmlFor={allergy}>
              {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllergyCheckboxes;
