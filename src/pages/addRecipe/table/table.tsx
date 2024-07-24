/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {  Row } from "@/types/ingredient";
import AddRow from "./newRow";
import NewRecipeTableCells,{  NewRecipeTableHeads } from "./tableSetUp";
import { FilePenIcon, TrashIcon } from "@/components/icons/icon";
import { roundToTwoDecimalPlaces } from "@/hooks/math";
import calculateTotals  from "../totals/calculate";

type NewRecipeTableProops = {
  className?: string;
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  setTotals: React.Dispatch<React.SetStateAction<ReturnType<typeof calculateTotals>>>
};



export default function NewRecipeTable({ className, rows, setRows, setTotals }: NewRecipeTableProops) {

  const [newWeight, setNewWeight] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [isAddingIngredient, setIsAddingIngredient] = useState<boolean>(false);
  const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false);



  const handleRowSelect = (row: Row) => {
    setSelectedRow(row);
  };


  useEffect(() => {
    setTotals(calculateTotals(rows));
  }, [rows, setTotals]);

  

  const handleEditWeight = () => {
    setIsEditingWeight(true);
  };

  const handleClose = () => {
    setIsEditingWeight(false);
    setSelectedRow(null);
  };

  const handleSaveEdit = () => {
    if (newWeight > 0){
      setRows(
        rows.map((row) =>
          row.id === selectedRow?.id
            ? {
                ...row,
                weight: roundToTwoDecimalPlaces(newWeight),
              }
            : row
        )
      );
      handleClose();
    }else alert("Please enter a valid value greater than 0 grams");
    
  };

  const handleDelete = () => {
    setRows(rows.filter((row) => row.id !== selectedRow?.id));
    setSelectedRow(null);
  };

 


  return (
    <div>

        {/* ----- TABLE ----- */}
    <div className={className}>
      <div className="relative w-full overflow-auto">

        <Table>

          <TableHeader>
            <NewRecipeTableHeads />
          </TableHeader>

          <TableBody>
                
            {rows.map((row) => (
              <TableRow key={row.id} onClick={() => handleRowSelect(row)} 
                className={`${ selectedRow && selectedRow.id === row.id ? "bg-muted/50 h-16": "hover:bg-muted/20 cursor-pointer h-12" }`}
              >

                {/*---------Ingredients--------- */}
                <NewRecipeTableCells row={row} setNewWeight={setNewWeight} selectedRow={selectedRow} handleSaveEdit={handleSaveEdit} handleClose={handleClose} isEditingWeight={isEditingWeight} />

                {/*---------Actions--------- */}
                <TableCell className="flex justify-center items-center text-muted-foreground">
                  {selectedRow && selectedRow.id === row.id && (
                    <div className="flex items-center justify-end gap-2">

                      {/* ----- EDIT BUTTON ----- */}
                      <Button variant="ghost" size="icon" onClick={handleEditWeight} className="text-muted-foreground hover:text-primary">
                        <FilePenIcon className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </Button>

                      {/* ----- DELETE BUTTON ----- */}
                      <Button variant="ghost" size="icon" onClick={handleDelete} className="text-muted-foreground hover:text-destructive">
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Button> 

                    </div>
                  )}
                </TableCell>
                {/*---------/--- Actions--------- */}
              </TableRow>
            ))}
            
            <AddRow
              rows={rows}
              setRows={setRows}
              setIsAddingIngredient={setIsAddingIngredient}
              isAddingIngredient={isAddingIngredient}
            />
            
          </TableBody>
        </Table>
      </div>
    </div>
    {/* -----/--- TABLE ----- */}
    </div>
  )
}



/*

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

        */