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
import { useFetchIngredient } from "../hooks/useFetchIngredient";
import { allergenIcons, categoryIcons } from "../types/icons";
import { Separator } from "@/components/ui/separator";
import SkeletonModal from "./SkeletonIngredientCard";

type IngredientCardProps = {
  _id: string;
};
export default function IngredientCard({ _id }: IngredientCardProps) {
  const id = String(_id);
  const {
    data: ingredientData,
    isLoading,
    isError,
    error,
  } = useFetchIngredient(id);

  const nutritionalInfo = Object.entries(ingredientData || {}).filter(
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
      {isLoading ? (
        <SkeletonModal />
      ) : isError || !ingredientData ? (
        <p>Ingredient not found, {isError && error?.message}</p>
      ) : (
        <>
          <CardHeader className="bg-background/80">
            <div className="flex flex-row items-center space-x-4 mb-2 ">
              <div className="bg-primary text-white p-3 rounded-full">
                {categoryIcons[ingredientData.category]}
              </div>
              <div>
                <CardTitle className="text-3xl">
                  {ingredientData.name}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="mt-1 bg-primary/60 text-white"
                >
                  {ingredientData.category}
                </Badge>
              </div>
            </div>
            <Separator className=" h-1.5 bg-primary/80 rounded-md" />
          </CardHeader>
          <CardContent className="bg-background/80">
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
                    <div key={key} className="bg-orange-300/20 p-2 rounded-md">
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
                                    ? "text-background bg-destructive hover:bg-destructive/80 dark:text-white dark:bg-destructive dark:hover:bg-destructive/80"
                                    : "bg-green-700 hover:bg-green-700/80 text-background dark:bg-green-900 dark:hover:bg-green-900/80 dark:text-white"
                                }`}
                              >
                                {allergenIcons[allergen as keyof Allergies]}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {allergen}{" "}
                                {hasAllergy ? "(allergen)" : "(safe)"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                    </TooltipProvider>
                  </div>
                </div>
              )}
              {ingredientData.saturatesLevel ||
              ingredientData.sugarsLevel ||
              ingredientData.fatLevel ? (
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
              ) : null}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
