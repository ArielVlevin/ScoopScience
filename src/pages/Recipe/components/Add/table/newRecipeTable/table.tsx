import { useState } from "react"
import { Table, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FilePenIcon, TrashIcon } from "@/components/icons/icon"
import { Row } from "@/Types/ingredient"
import { NewRecipeTableAddIngredientRow } from "./newRow"
import { NewRecipeTableCells, NewRecipeTableHeads } from "./tableSetUp"


import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BulletExample } from "@/components/chart/bullet"

type NewRecipeTableProops = {
  className?: string,
}

export default function NewRecipeTable({className}: NewRecipeTableProops) {
  const [rows, setRows] = useState<Row[]>([
    {
      id: '11',
      name: "Milk",
      weight: 200,
      category: "dairy",
      calories: 150,
      sugar: 20,
      protein: 5,
      fat: 5,
      totalSolids: 12,
      msnf: 8,
    },

    {
      id: '22',
      name: "Milk",
      weight: 200,
      category: "dairy",
      calories: 150,
      sugar: 20,
      protein: 5,
      fat: 5,
      totalSolids: 12,
      msnf: 8,
    },

    {
      id: '33',
      name: "Milk",
      weight: 200,
      category: "dairy",
      calories: 150,
      sugar: 20,
      protein: 5,
      fat: 5,
      totalSolids: 12,
      msnf: 8,
    },

    {
      id: '44',
      name: "Milk",
      weight: 200,
      category: "dairy",
      calories: 150,
      sugar: 20,
      protein: 5,
      fat: 5,
      totalSolids: 12,
      msnf: 8,
    },
    {
      id: '55',
      name: "Milk",
      weight: 200,
      category: "dairy",
      calories: 150,
      sugar: 20,
      protein: 5,
      fat: 5,
      totalSolids: 12,
      msnf: 8,
    },
  ])

  const [newWeight, setNewWeight] = useState<number>(0)

  const [selectedRow, setSelectedRow] = useState<Row | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [isPopoverOpen2, setIsPopoverOpen2] = useState<boolean>(false)

  const handleRowSelect = (row: Row) => {
    setSelectedRow(row)
  }

  const handleEdit = () => {
    setIsPopoverOpen2(true)
  }

  const handleClose = () => {
    setIsPopoverOpen2(false)
    setSelectedRow(null)
  }


  const handleSaveEdit = () => {
    setRows(
      rows.map((row) =>
        row.id === selectedRow?.id
          ?  {
              ...row,
              weight: newWeight,
            }
          : row,
      ),
    )
    handleClose();
  }


 

  const handleDelete = () => {
    setRows(rows.filter((row) => row.id !== selectedRow?.id))
    setSelectedRow(null)
  }

  const [newRow, setNewRow] = useState<Row>({
    id: "3",
    name: "new ingredient",
    weight: 0,
    category: "dairy",
    calories: 0,
    sugar: 0,
    fat: 0,
    protein: 0,
    totalSolids: 0,
    msnf: 0,
  })

  const handleSaveRow = (newRowData: Row) => {
    setRows([...rows, newRowData])
    setNewRow({
      id: "4",
      name: "",
      weight: 0,
      category: "dairy",
      calories: 0,
      sugar: 0,
      fat: 0,
      protein: 0,
      totalSolids: 0,
      msnf: 0,
    })
    //setIsPopoverOpen(false)  // Close the popover after saving the row
  }

  return (
    <div className={className}>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <NewRecipeTableHeads />
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} onClick={() => handleRowSelect(row)} className={`${
                  selectedRow && selectedRow.id === row.id ? "bg-muted/50 h-16": "hover:bg-muted/20 cursor-pointer h-12"
                }`}
              >
                                <div className="flex justify-center items-center">
        {(isPopoverOpen2&&selectedRow && selectedRow.id === row.id) &&(

                 <Popover open={isPopoverOpen2} onOpenChange={setIsPopoverOpen2}>
                 <PopoverTrigger>
                  {isPopoverOpen2}
                </PopoverTrigger>
                 <PopoverContent className="w-[400px] p-4 grid gap-4" >
                   <div className="grid gap-2">
                     <Label htmlFor="weight" className="text-foreground">
                       Weight
                     </Label>
                     <Input
                       id="weight"
                       type="number"
                       placeholder="Enter weight"
                       value={selectedRow.weight}
                       onChange={(e) => setNewWeight(parseInt(e.target.value))}
                     />
                   </div>
                   <div className="flex justify-end gap-2">
                     <Button variant="outline" onClick={() => setIsPopoverOpen2(false)}>
                       Cancel
                     </Button>
                     <Button onClick={handleSaveEdit}>Add</Button>
       
                   </div>
                 </PopoverContent>
               </Popover>
        )}
        </div>

                <NewRecipeTableCells row={row} setNewWeight={setNewWeight} selectedRow={selectedRow} handleSaveEdit={handleSaveEdit} handleClose={handleClose} isPopoverOpen2={isPopoverOpen2} />

                {/*---------Actions--------- */}
                <TableCell className="flex justify-center items-center text-muted-foreground">
                  {selectedRow && selectedRow.id === row.id && (
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={handleEdit} className="text-muted-foreground hover:text-primary">
                        <FilePenIcon className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleDelete} className="text-muted-foreground hover:text-destructive">
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  )}
                </TableCell>
                {/*---------/Actions---------*/}
              </TableRow>
            ))}
            <NewRecipeTableAddIngredientRow
              setIsPopoverOpen={setIsPopoverOpen}
              newRow={newRow}
              setNewRow={setNewRow}
              handleSaveRow={handleSaveRow}
              isPopoverOpen={isPopoverOpen}
            />
            
          </TableBody>
        </Table>
      </div>
      <div>
        <BulletExample />
      </div>
    </div>
  )
}
