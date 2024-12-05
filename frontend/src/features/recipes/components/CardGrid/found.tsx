import { cn } from "@/utils/cn";

type RecipeFoundProps = {
  className?: string;
  recipesLength: number;
};

export function RecipeFound({ className, recipesLength }: RecipeFoundProps) {
  return (
    <p className={cn(className, "text-sm text-muted-foreground text-center")}>
      {recipesLength} recipes found
    </p>
  );
}
