import { cn } from "@/utils/cn";

type RecipeFoundProps = {
  className?: string;
  recipesLength: number;
  isShowRecipeFound?: boolean;
};

export function RecipeFound({
  className,
  recipesLength,
  isShowRecipeFound = true,
}: RecipeFoundProps) {
  if (!isShowRecipeFound) return null;

  return (
    <p className={cn(className, "text-sm text-muted-foreground text-center")}>
      {recipesLength} recipes found
    </p>
  );
}
