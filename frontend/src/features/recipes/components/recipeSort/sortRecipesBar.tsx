import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import {
  ChevronDownIcon,
  FilterIcon,
  ListOrderedIcon,
} from "@/components/icons/icon";
import { Button } from "@/components/ui/button";
import Search from "@/components/class/search";

type CheckBoxWithTextProops = {
  id: string;
  className: string;
  text: string;
};
function CheckBoxWithText({ id, className, text }: CheckBoxWithTextProops) {
  return (
    <div className={className}>
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
    </div>
  );
}

export default function SortRecipesBar() {
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex flex-col items-center gap-4 bg-slate-500 p-4 rounded-xl shadow-sm">
        <Search className="w-full" url="/recipes/search" />

        <div className="flex flex-wrap items-center gap-4 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 flex items-center gap-2 w-"
              >
                <FilterIcon className="w-5 h-5 text-muted-foreground" />
                Filter by
                <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value="date">
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="popularity">
                  Popularity
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price">
                  Price
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 flex items-center gap-2"
              >
                <ListOrderedIcon className="w-5 h-5 text-muted-foreground" />
                Sort by
                <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value="date">
                <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="popularity">
                  Popularity
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price">
                  Price
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-4 flex items-center gap-2"
              >
                <FilterIcon className="w-5 h-5 text-muted-foreground" />
                More filters
                <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuCheckboxItem>Filter 1</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Filter 2</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Filter 3</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Filter 4</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Filter 5</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex flex-wrap items-center gap-4">
            <CheckBoxWithText
              id="ckeckbox-1"
              text="ckeckbox-1"
              className="flex items-center space-x-2 text-muted"
            />
            <CheckBoxWithText
              id="ckeckbox-2"
              text="ckeckbox-2"
              className="flex items-center space-x-2 text-muted"
            />
            <CheckBoxWithText
              id="ckeckbox-3"
              text="ckeckbox-3"
              className="flex items-center space-x-2 text-muted"
            />
            <CheckBoxWithText
              id="ckeckboxp-4"
              text="ckeckbox-4"
              className="flex items-center space-x-2 text-muted"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
