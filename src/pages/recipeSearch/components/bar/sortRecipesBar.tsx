


import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"

import { ChevronDownIcon, FilterIcon, ListOrderedIcon, SearchIcon } from "@/components/icons/icon"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


type CheckBoxWithTextProops = 
  {
    id: string,
    className: string,
    text: string
  }
function CheckBoxWithText({id, className, text}: CheckBoxWithTextProops) {
  return (
    <div className={className} >
      <Checkbox id= {id} />
      <label htmlFor= {id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" >
        {text}
      </label>
    </div>
  )
}



export default function SortRecipesBar() {
  return (
    <div className="flex flex-col items-center gap-4 bg-base-200 p-4 rounded-lg shadow-sm">

      <div className="relative flex-1 w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-10 pr-12 h-10 w-full rounded-md bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 px-4 flex items-center gap-2 w-">
              <FilterIcon className="w-5 h-5 text-muted-foreground" />
              Filter by
              <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value="date">
              <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="popularity">Popularity</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 px-4 flex items-center gap-2">
              <ListOrderedIcon className="w-5 h-5 text-muted-foreground" />
              Sort by
              <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value="date">
              <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="popularity">Popularity</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 px-4 flex items-center gap-2">
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

          <CheckBoxWithText id='ckeckbox-1' text='ckeckbox-1' className='flex items-center space-x-2' />
          <CheckBoxWithText id='ckeckbox-2' text='ckeckbox-2' className='flex items-center space-x-2' />
          <CheckBoxWithText id='ckeckbox-3' text='ckeckbox-3' className='flex items-center space-x-2' />
          <CheckBoxWithText id='ckeckboxp-4' text='ckeckbox-4' className='flex items-center space-x-2' />
        </div>
            </div>
          </div>

  )
}




