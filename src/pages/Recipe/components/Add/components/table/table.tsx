/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Ygj3AsG54x1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { SetStateAction, useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FilePenIcon, PlusIcon, TrashIcon } from "@/components/icons/icon"

export default function Component() {

  const [rows, setRows] = useState([
    {
      id: 1,
      ingredients: "Milk, Sugar, Cocoa Powder",
      weight: 200,
      category: "Dairy",
      calories: 150,
      sugar: 20,
      fat: 5,
      solidPercentage: 12,
      msnf: 8,
    },
    {
      id: 2,
      ingredients: "Flour, Eggs, Butter",
      weight: 150,
      category: "Baked Goods",
      calories: 300,
      sugar: 10,
      fat: 15,
      solidPercentage: 20,
      msnf: 5,
    },
    {
      id: 3,
      ingredients: "Chicken, Broccoli, Rice",
      weight: 400,
      category: "Entree",
      calories: 450,
      sugar: 5,
      fat: 10,
      solidPercentage: 25,
      msnf: 3,
    },
  ])
  
  const [newRow, setNewRow] = useState({
    id: rows.length + 1,
    ingredients: "",
    weight: 0,
    category: "",
    calories: 0,
    sugar: 0,
    fat: 0,
    solidPercentage: 0,
    msnf: 0,
  })

  const [selectedRow, setSelectedRow] = useState(null)
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value })
  }
  
  const addRow = () => {
    setRows([...rows, newRow])
    setNewRow({
      id: rows.length + 2,
      ingredients: "",
      weight: 0,
      category: "",
      calories: 0,
      sugar: 0,
      fat: 0,
      solidPercentage: 0,
      msnf: 0,
    })
  }

  const handleRowSelect = (row: SetStateAction<null>) => {
    setSelectedRow(row)
  }
  const handleEdit = () => {}
  const handleDelete = () => {}
  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Ingredients</TableHead>
              <TableHead className="text-center">Weight</TableHead>
              <TableHead className="text-center">Category</TableHead>
              <TableHead className="text-center">Calories</TableHead>
              <TableHead className="text-center">Sugar</TableHead>
              <TableHead className="text-center">Fat</TableHead>
              <TableHead className="text-center">Solid Percentage</TableHead>
              <TableHead className="text-center">MSNF</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => handleRowSelect(row)}
                className={`${
                  selectedRow && selectedRow.id === row.id ? "bg-muted/50" : "hover:bg-muted/20 cursor-pointer"
                } h-12`}
              >
                <TableCell className="text-center">{row.ingredients}</TableCell>
                <TableCell className="text-center">{row.weight}</TableCell>
                <TableCell className="text-center">{row.category}</TableCell>
                <TableCell className="text-center">{row.calories}</TableCell>
                <TableCell className="text-center">{row.sugar}</TableCell>
                <TableCell className="text-center">{row.fat}</TableCell>
                <TableCell className="text-center">{row.solidPercentage}</TableCell>
                <TableCell className="text-center">{row.msnf}</TableCell>
                <TableCell className="text-right">
                  {selectedRow && selectedRow.id === row.id && (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEdit}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <FilePenIcon className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="h-12">
              <TableCell className="text-center">
                <Input
                  name="ingredients"
                  value={newRow.ingredients}
                  onChange={handleInputChange}
                  placeholder="Ingredients"
                />
              </TableCell>
              <TableCell className="text-center">
                <Input
                  name="weight"
                  type="number"
                  value={newRow.weight}
                  onChange={handleInputChange}
                  placeholder="Weight"
                />
              </TableCell>
              <TableCell className="text-center">
                <Input name="category" value={newRow.category} onChange={handleInputChange} placeholder="Category" />
              </TableCell>
              <TableCell className="text-center">
                <Input
                  name="calories"
                  type="number"
                  value={newRow.calories}
                  onChange={handleInputChange}
                  placeholder="Calories"
                />
              </TableCell>
              <TableCell className="text-center">
                <Input
                  name="sugar"
                  type="number"
                  value={newRow.sugar}
                  onChange={handleInputChange}
                  placeholder="Sugar"
                />
              </TableCell>
              <TableCell className="text-center">
                <Input name="fat" type="number" value={newRow.fat} onChange={handleInputChange} placeholder="Fat" />
              </TableCell>
              <TableCell className="text-center">
                <Input
                  name="solidPercentage"
                  type="number"
                  value={newRow.solidPercentage}
                  onChange={handleInputChange}
                  placeholder="Solid Percentage"
                />
              </TableCell>
              <TableCell className="text-center">
                <Input name="msnf" type="number" value={newRow.msnf} onChange={handleInputChange} placeholder="MSNF" />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={addRow}
                  className="text-muted-foreground hover:text-primary"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add row</span>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

