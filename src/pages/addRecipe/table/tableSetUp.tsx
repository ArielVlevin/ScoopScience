
import { TableRow, TableHead, TableCell } from "@/components/ui/table"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { CheckIcon, InfoIcon, XIcon } from "@/components/icons/icon"
import { Row } from "@/types/ingredient"
import { Input } from "@/components/ui/input"



export function NewRecipeTableHeads(){
  return (
        <TableRow>
          <TableHead className="text-center flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <InfoIcon className="h-4 w-4" />
                    <span className="sr-only">Ingredients information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This column shows the ingredients used in the product.</p>
                </TooltipContent>
              </Tooltip>
              <span className="text-foreground">Ingredients</span>
            </TooltipProvider>
          </TableHead>
          <TableHead className="text-center text-foreground">Weight</TableHead>
          <TableHead className="text-center text-foreground">Category</TableHead>
          <TableHead className="text-center text-foreground">Calories</TableHead>
          <TableHead className="text-center text-foreground">Sugar</TableHead>
          <TableHead className="text-center text-foreground">Fat</TableHead>
          <TableHead className="text-center text-foreground">Solid Percentage</TableHead>
          <TableHead className="text-center text-foreground">MSNF</TableHead>
          <TableHead className="flex justify-center items-center text-muted-foreground">Actions</TableHead>
        </TableRow>
  )
}




type TableCellsProps = {

   row: Row;
   selectedRow: Row | null;
   setNewWeight : React.Dispatch<React.SetStateAction<number>>;
   handleSaveEdit: () => void;
   handleClose: () => void;
   isEditingWeight: boolean;
 
}


export default function TableCells({row, selectedRow, setNewWeight, handleSaveEdit, handleClose, isEditingWeight}: TableCellsProps) {

  return(
    <>
    <TableCell className="text-center flex items-center gap-2">

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <InfoIcon className="h-4 w-4" />
              <span className="sr-only">Ingredients information</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>The ingredients used in this product.</p>
          </TooltipContent>
        </Tooltip>
        <span className="text-foreground">{row.name}</span>
      </TooltipProvider>

    </TableCell>
    
    <TableCell className="text-center text-foreground">
                  {selectedRow && selectedRow.id === row.id && isEditingWeight ? (
                    <div className="flex items-center gap-2">
                      <Input
                        id="weight"
                        type="number"
                        placeholder={String(row.weight)}
                        onChange={(e) => setNewWeight(Number(e.target.value))}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSaveEdit}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <CheckIcon className="w-4 h-4" />
                        <span className="sr-only">Save</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <XIcon className="w-4 h-4" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </div>
                  ) : (
                    row.weight
                  )}
   </TableCell>
    
    <TableCell className="text-center text-foreground">{row.category}</TableCell>
    <TableCell className="text-center text-foreground">{row.calories}</TableCell>
    <TableCell className="text-center text-foreground">{row.sugar}</TableCell>
    <TableCell className="text-center text-foreground">{row.fat}</TableCell>
    <TableCell className="text-center text-foreground">{row.totalSolids}</TableCell>
    <TableCell className="text-center text-foreground">{row.msnf}</TableCell>
    </>
  )
}

