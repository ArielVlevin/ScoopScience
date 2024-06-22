import { TableRow, TableCell } from "@/components/ui/table"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "@/components/icons/icon"
import { IngredientCategory, Row } from "@/Types/ingredient"

type NewRecipeTableAddIngredientRowProps = {
  isPopoverOpen: boolean;
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newRow: Row;
  setNewRow: React.Dispatch<React.SetStateAction<Row>>;
  handleSaveRow: (newRowData: Row) => void;
}

export function NewRecipeTableAddIngredientRow({ isPopoverOpen, setIsPopoverOpen, newRow, setNewRow, handleSaveRow } : NewRecipeTableAddIngredientRowProps) {
  return(
    <TableRow>
      <TableCell className="text-center" colSpan={9}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} >
                <PopoverTrigger>
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add row</span>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-4 grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ingredients" className="text-foreground">Ingredients</Label>
                    <Select onValueChange={(value) => setNewRow({ ...newRow, name: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select ingredients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="milk">Milk</SelectItem>
                        <SelectItem value="sugar">Sugar</SelectItem>
                        <SelectItem value="cocoa">Cocoa Powder</SelectItem>
                        <SelectItem value="flour">Flour</SelectItem>
                        <SelectItem value="eggs">Eggs</SelectItem>
                        <SelectItem value="butter">Butter</SelectItem>
                        <SelectItem value="chicken">Chicken</SelectItem>
                        <SelectItem value="broccoli">Broccoli</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="weight" className="text-foreground">Weight</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter weight"
                      value={newRow.weight}
                      onChange={(e) => setNewRow({ ...newRow, weight: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category" className="text-foreground">Category</Label>
                    <Select onValueChange={(value:IngredientCategory) => setNewRow({ ...newRow, category: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dairy">Dairy</SelectItem>
                        <SelectItem value="dairy">Baked Goods</SelectItem>
                        <SelectItem value="dairy">Entree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsPopoverOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleSaveRow(newRow)}>Add</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add new ingredient</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  )
}
