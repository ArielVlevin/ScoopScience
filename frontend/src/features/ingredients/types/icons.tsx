import {
  BeanIcon,
  EggIcon,
  MilkIcon,
  NutIcon,
  WheatIcon,
} from "@/components/icons/icon";
import { Allergies, IngredientCategory } from "@/types";
import { cn } from "@/utils/cn";
import {
  AppleIcon,
  BicepsFlexedIcon,
  CandyIcon,
  CookieIcon,
  DropletIcon,
  EllipsisIcon,
} from "lucide-react";

export const allergenIcons: Record<keyof Allergies, React.ReactNode> = {
  milk: <MilkIcon className="h-6 w-6" />,
  nuts: <NutIcon className="h-6 w-6" />,
  egg: <EggIcon className="h-6 w-6" />,
  soy: <BeanIcon className="h-6 w-6" />,
  wheat: <WheatIcon className="h-6 w-6" />,
};
export const categoryIcons: Record<IngredientCategory, React.ReactNode> = {
  dairy: <MilkIcon className="h-6 w-6" />,
  sugars: <CandyIcon className="h-6 w-6" />,
  stabilizer: <BicepsFlexedIcon className="h-6 w-6" />,
  fruits: <AppleIcon className="h-6 w-6" />,
  adding: <CookieIcon className="h-6 w-6" />,
  nuts: <NutIcon className="h-6 w-6" />,
  liquid: <DropletIcon className="h-6 w-6" />,
  other: <EllipsisIcon className="h-6 w-6" />,
};

export const getCategoryIcon = (
  category: IngredientCategory,
  className = "size-5 text-white"
): React.ReactNode => {
  const icons: Record<IngredientCategory, React.ReactNode> = {
    dairy: <MilkIcon className={cn(className, "text-white")} />,
    sugars: <CandyIcon className={cn(className, "text-white")} />,
    stabilizer: <BicepsFlexedIcon className={cn(className, "text-white")} />,
    fruits: <AppleIcon className={cn(className, "text-white")} />,
    adding: <CookieIcon className={cn(className, "text-white")} />,
    nuts: <NutIcon className={cn(className, "text-white")} />,
    liquid: <DropletIcon className={cn(className, "text-white")} />,
    other: <EllipsisIcon className={cn(className, "text-white")} />,
  };

  return icons[category];
};
