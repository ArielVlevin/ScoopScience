import * as React from 'react';
import { DataGrid, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowModel, GridRowModesModel, GridSlots, gridClasses} from '@mui/x-data-grid';
import { Toolbar } from './ToolBar';

interface Row {
  id: string;
  name: string;
  category: string;
  fat_percentage: number;
  solids_percentage: number;
  weight: number;
}

function precentFormat(value:number){
  if(!value) 
    return '0%';
  else  
    return `${value}%`
}


const columns :GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'weight', headerName: 'Weight',align:'left', type:'number', editable: true, width: 150 },
  { field: 'category', headerName: 'Category', valueOptions: ['milk base', 'sugars', 'stabilizer', 'fruits', 'adding'], width: 150 },
  { field: 'fat_percentage', headerName: 'Fat Percentage', width: 150, valueFormatter:(value)=>{return precentFormat(value);} },
  { field: 'solids_percentage', headerName: 'Solids Percentage', width: 200, valueFormatter:(value)=>{return precentFormat(value);} }, 
  { field: 'id', headerName: 'ID', width: 150 },

];

const initialRows: Row[] = [
  { id: '1', name: 'Milk', category: 'milk base', fat_percentage: 3, solids_percentage: 8, weight: 500 },
  { id: '3', name: 'Sugar', category: 'sugars', fat_percentage: 0, solids_percentage: 100, weight: 200 },
  // Add more initial rows as needed
];


const calculateTotals = (rows: Row[]) => {
  let totalWeight = 0;
  let totalFat = 0;
  let totalSolid = 0;

  rows.forEach(row => {
    const weight = Number(row.weight);
    const fatPercentage = Number(row.fat_percentage);
    const solidsPercentage = Number(row.solids_percentage);

    totalWeight += weight;
    totalFat += (fatPercentage * weight) / 100;
    totalSolid += (solidsPercentage * weight) / 100;
  });

  return { totalWeight, totalFat, totalSolid };
};



export default function IngredientsDataGrid() {
  const [rows, setRows] = React.useState<Row[]>(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]); 


  const [totals, setTotals] = React.useState(calculateTotals(initialRows));
;

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
      setTotals(calculateTotals(updatedRows));
      return updatedRows;
    });
    return updatedRow;
  };

  React.useEffect(() => {
    setTotals(calculateTotals(rows));
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
        
        sx={{
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: { outline: 'none', },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: { outline: 'none', },
          boxShadow:'none'
        }}
      />
      <p>Total weight: {totals.totalWeight}</p>
      <p>Total Fat: {totals.totalFat} grams </p>
      <p>Total Fat: {(totals.totalFat / (totals.totalWeight / 100))}% </p>
      <p>Total Solid: {(totals.totalSolid / (totals.totalWeight / 100))}% </p>
    </div>
  );
}
