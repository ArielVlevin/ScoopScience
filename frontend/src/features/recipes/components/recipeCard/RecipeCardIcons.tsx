import {
  BeanIcon,
  EggIcon,
  MilkIcon,
  NutIcon,
  WheatIcon,
} from "@/components/icons/icon";

import { Allergies } from "@/types";

type RecipeCardIconsProps = {
  allergies: Allergies;
};
export default function RecipeCardIcons({ allergies }: RecipeCardIconsProps) {
  return (
    <div className="flex justify-center gap-4">
      {allergies.nuts ? (
        <div className="flex items-center gap-2">
          <NutIcon className="w-5 h-5 text-orange-800" />
          <span className="text-muted-foreground">Nuts</span>
        </div>
      ) : null}
      {allergies.milk ? (
        <div className="flex items-center gap-2">
          <MilkIcon className="w-5 h-5 text-blue-200" />
          <span className="text-muted-foreground">Milk</span>
        </div>
      ) : null}
      {allergies.egg ? (
        <div className="flex items-center gap-2">
          <EggIcon className="w-5 h-5  " />
          <span className="text-muted-foreground">eggs</span>
        </div>
      ) : null}
      {allergies.soy ? (
        <div className="flex items-center gap-2">
          <BeanIcon className="w-5 h-5 text-green-500" />
          <span className="text-muted-foreground">Soy</span>
        </div>
      ) : null}
      {allergies.wheat ? (
        <div className="flex items-center gap-2">
          <WheatIcon className="w-5 h-5 text-yellow-300" />
          <span className="text-muted-foreground">Dairy</span>
        </div>
      ) : null}
    </div>
  );
}
