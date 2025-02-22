import React from "react";
import { getCategoryIcon } from "../types/icons";
import { IngredientCategory } from "../types";
import { useTheme } from "@/contexts/ThemeProvider";

interface IngredientGridIconProps {
  id: string;
  header: string;
  category: IngredientCategory;
  onClick: (id: string) => void;
}

const IngredientGridIcon: React.FC<IngredientGridIconProps> = ({
  id,
  header,
  category,
  onClick,
}) => {
  const { settings } = useTheme();

  return (
    <div className={settings.IngredientGrid} onClick={() => onClick(id)}>
      <div className={settings.IngredientGridIcon}>
        {getCategoryIcon(category)}
      </div>
      <h3 className={settings.IngredientGridText}>{header}</h3>
    </div>
  );
};

export default IngredientGridIcon;
/*
<Link
  className="flex flex-col items-center size-48 text-center"
  to={`/IngredientsCategory/${category}`}
  state={{
    ingredients: ingredientsByCategory[category],
  }}
>
  <div className="inline-block rounded-full bg-primary hover:bg-primary/70 p-12 ">
    <EllipsisIcon className="h-12 w-12 text-white" />
  </div>
  <h3 className="text-lg font-medium group-hover:text-primary transition-colors hover:underline mt-2">
    See More
  </h3>
</Link>;*/
