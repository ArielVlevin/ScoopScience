import { User } from "@/auth/types/userTypes";
import { Ingredient, Recipe } from "@/types";
import { CircleIcon } from "lucide-react";

type AutocompleteSectionProps<T> = {
  title: string;
  items: T[];
  onSelect: (item: T) => void;
  label: string;
  iconClassName: string;
};

export function AutocompleteSection<T>({
  title,
  items,
  onSelect,
  label,
  iconClassName,
}: AutocompleteSectionProps<T>) {
  if (items.length === 0) return null;

  return (
    <div>
      <h4 className="font-bold mb-1">{title}:</h4>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => onSelect(item)}
            className="p-2 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex gap-2">
              <CircleIcon className={`size-8 ${iconClassName}`} />
              <div>
                <a className={`text-sm ${iconClassName}`}>{label}</a>
                <a className="font-bold">
                  {(item as Ingredient).name ||
                    (item as Recipe).recipeData?.recipeName ||
                    (item as User).userName}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
