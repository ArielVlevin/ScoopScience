import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Allergies } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { getLevelColor } from "@/utils/level";
import useGetIngredient from "../hooks/useGetIngredient";
import { allergenIcons, categoryIcons } from "../types/icons";

/*
// Mock ingredient data for demonstration
const mockIngredient: Ingredient = {
  name: "Heavy Cream",
  weight: 100, // standard weight for nutritional info
  category: "dairy",
  calories: 340,
  sugar: 2.8,
  fat: 36,
  saturates: 0.5,
  protein: 2.1,
  totalSolids: 40.9,
  msnf: 4.9,

  fatLevel: "High",
  saturatesLevel: "Low",
  sugarsLevel: "High",

  allergies: { milk: true, nuts: false, egg: false, soy: false, wheat: false },
};
*/

type IngredientCardProps = {
  _id: string;
};
export default function IngredientCard({ _id }: IngredientCardProps) {
  const id = String(_id);
  const { ingredientData, isLoading, isError, error } = useGetIngredient(id);

  const nutritionalInfo = Object.entries(ingredientData).filter(
    ([key]) =>
      ![
        "name",
        "weight",
        "category",
        "allergies",
        "_id",
        "__v",
        "updatedAt",
        "createdAt",
      ].includes(key)
  );

  return (
    <Card>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error?.message}</p>}
      <CardHeader className="flex flex-row items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-full">
          {categoryIcons[ingredientData.category]}
        </div>
        <div>
          <CardTitle className="text-3xl">{ingredientData.name}</CardTitle>
          <Badge variant="secondary" className="mt-1">
            {ingredientData.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Nutritional Information
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Per 100g serving
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
              {nutritionalInfo.map(([key, value]) => (
                <div key={key} className="bg-yellow-300/20 p-2 rounded-md">
                  <span className="font-semibold capitalize">{key}: </span>
                  <span>
                    {value as number}
                    {key === "calories" ? "" : "g"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {ingredientData.allergies && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Allergens</h3>
              <div className="flex flex-wrap gap-4">
                <TooltipProvider>
                  {Object.entries(ingredientData.allergies)
                    .filter(([key]) => key != "_id")
                    .map(([allergen, hasAllergy]) => (
                      <Tooltip key={allergen}>
                        <TooltipTrigger>
                          <div
                            className={`p-2 rounded-full ${
                              hasAllergy
                                ? "bg-destructive/20"
                                : "bg-green-300/20"
                            }`}
                          >
                            {allergenIcons[allergen as keyof Allergies]}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {allergen} {hasAllergy ? "(allergen)" : "(safe)"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                </TooltipProvider>
              </div>
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Additional Information
            </h3>
            <ul className="flex flex-wrap gap-4">
              {ingredientData.fatLevel && (
                <li
                  className={`${getLevelColor(
                    ingredientData.fatLevel!
                  )} text-white rounded-md p-1`}
                >
                  Fat Level: {ingredientData.fatLevel}
                </li>
              )}

              {ingredientData.saturatesLevel && (
                <li
                  className={`${getLevelColor(
                    ingredientData.saturatesLevel!
                  )} text-white rounded-md p-1`}
                >
                  Saturates Level: {ingredientData.saturatesLevel}
                </li>
              )}
              {ingredientData.sugarsLevel && (
                <li
                  className={`${getLevelColor(
                    ingredientData.sugarsLevel!
                  )} text-white rounded-md p-1`}
                >
                  Sugars Level: {ingredientData.sugarsLevel}
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
