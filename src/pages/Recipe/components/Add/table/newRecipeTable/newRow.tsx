import { TableRow, TableCell } from "@/components/ui/table"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "@/components/icons/icon"
import React, { useEffect } from "react"
import useGetIngredient, { useGetIngredientsArray } from "@/hooks/useGetIngredient"
import { Ingredient } from '../../../../../../Types/ingredient';

type NewRecipeTableAddIngredientRowProps = {
  isAddingIngredient: boolean;
  setIsAddingIngredient: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveNewRow: (newRowData: Ingredient | null, weight: number) => void;
}

export function NewRecipeTableAddIngredientRow({ isAddingIngredient, setIsAddingIngredient, handleSaveNewRow } : NewRecipeTableAddIngredientRowProps) {

  const [category, setCategory] = React.useState<string>('');
  const [selectedIngredient, setSelectedIngredient] = React.useState<string>('');
  const [weight, setWeight] = React.useState<number>(100);
  const [ingredient, setIngredient] = React.useState<Ingredient | null >(null);

  const { ingredientsByCategory } = useGetIngredientsArray();
  const {ingredientData} = useGetIngredient(selectedIngredient);



  useEffect(() => {
    // get the ingredient from backend
    setIngredient(ingredientData);
  }, [selectedIngredient, ingredientData]);



  return(
    <TableRow>
      <TableCell className="text-center" colSpan={9}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Popover open={isAddingIngredient} onOpenChange={setIsAddingIngredient} >
                <PopoverTrigger>
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add row</span>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-4 grid gap-4">



                <div className="grid gap-2">
                    <Label htmlFor="category" className="text-foreground">Category</Label>
                    <Select onValueChange={ (e)=>setCategory(e) }>


                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>

                        {Object.keys(ingredientsByCategory).map((categoryKey) => (
                          <SelectItem key={categoryKey} value={categoryKey}>{categoryKey}</SelectItem>
                        ))}

                      </SelectContent>
                    </Select>
                  </div>

                  {category && ( 
                  <div>
                  <div className="grid gap-2">
                    <Label htmlFor="ingredients" className="text-foreground">Ingredients</Label>
                    <Select onValueChange = { (e)=> setSelectedIngredient(e) } >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select ingredients" />
                      </SelectTrigger>

                      <SelectContent>

                        {ingredientsByCategory[category].map((ingredient, index) => (
                          <SelectItem key={index} value={ingredient.id}>{ingredient.name}</SelectItem>
                        ))}

                      </SelectContent>

                    </Select>
                  </div>
                  

                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="weight" className="text-foreground">Weight</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter weight"
                      onChange={(e) => setWeight(parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingIngredient(false)}>Cancel</Button>
                    <Button onClick={() => handleSaveNewRow(ingredient, weight) }>Add</Button>
                  </div>
                  </div>
                  )}

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
