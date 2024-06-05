import * as React from 'react';
import { DataGrid, GridEventListener, GridRowEditStopReasons, GridRowModel, GridRowModesModel, GridSlots, useGridApiContext } from '@mui/x-data-grid';
import { Toolbar } from './ToolBar';

interface Row {
  id: string;
  name: string;
  category: string;
  fat_percentage: number;
  solids_percentage: number;
  weight: number;
}

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'category', headerName: 'Category', valueOptions: ['milk base', 'sugars', 'stabilizer', 'fruits', 'adding'], width: 150 },
  { field: 'fat_percentage', headerName: 'Fat Percentage', width: 150 },
  { field: 'solids_percentage', headerName: 'Solids Percentage', width: 200 },
  { field: 'weight', headerName: 'Weight', editable: true, width: 150 },
];

const initialRows: Row[] = [
  { id: '1', name: 'Milk', category: 'milk base', fat_percentage: 3, solids_percentage: 8, weight: 500 },
  { id: '3', name: 'Sugar', category: 'sugars', fat_percentage: 0, solids_percentage: 100, weight: 200 },
  // Add more initial rows as needed
];

const calculateTotalWeight = (rows: Row[]): number => {
  return rows.reduce((total, row) => total + Number(row.weight), 0);
};

const calculateTotalFat = (rows: Row[]): number => {
  return rows.reduce((total, row) => total + Number(row.fat_percentage)*(Number(row.weight)/Number(100)) , 0);
};

const calculateTotalSolid = (rows: Row[]): number => {
  return rows.reduce((total, row) => total + Number(row.solids_percentage)*(Number(row.weight)/Number(100)) , 0);
};

export default function IngredientsDataGrid() {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]); 
  const [totalWeight, setTotalWeight] = React.useState<number>(calculateTotalWeight(initialRows));
  const [totalFat, setTotalFat] = React.useState<number>(calculateTotalFat(initialRows));
  const [totalSolid, setTotalSolid] = React.useState<number>(calculateTotalSolid(initialRows));

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow: Row = {
      id: newRow.id,
      name: newRow.name,
      category: newRow.category,
      fat_percentage: newRow.fat_percentage,
      solids_percentage: newRow.solids_percentage,
      weight: newRow.weight,
    };
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row));
      setTotalWeight(calculateTotalWeight(updatedRows)); // Update total weight after row update
      setTotalFat(calculateTotalFat(updatedRows));
      setTotalSolid(calculateTotalSolid(updatedRows));
      return updatedRows;
    });
    return updatedRow;
  };
  React.useEffect(() => {
    setTotalWeight(calculateTotalWeight(rows));
    setTotalFat(calculateTotalFat(rows));
    setTotalSolid(calculateTotalSolid(rows));
  }, [rows]);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableMultipleRowSelection
        hideFooter
        disableColumnMenu
        editMode="row"
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRowIds(newSelection as string[]);
        }} 
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: Toolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, selectedRowIds, rows },
        }}
      />
      <p>Total weight: {totalWeight}</p>
      <p>Total Fat: {Number(totalFat)} grams </p>
      <p>Total Fat: {Number(totalFat) /(totalWeight/100)}% </p>
      <p>Total Solid: {Number(totalSolid) /(totalWeight/100)}% </p>
    </div>
  );
}
