import * as React from 'react';
import { DataGrid, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowModel, GridRowModesModel, GridSlots, gridClasses } from '@mui/x-data-grid';
import { Toolbar } from './ToolBar';
import { IngredientsDataGridProps, Row } from '../../../interfaces/recipe';



function percentFormat(value: number) {
  return value ? `${value}%` : '0%';
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'weight', headerName: 'Weight', align: 'left', type: 'number', editable: true, width: 150 },
  { field: 'category', headerName: 'Category', valueOptions: ['milk base', 'sugars', 'stabilizer', 'fruits', 'adding'], width: 150 },
  { field: 'fat_percentage', headerName: 'Fat Percentage', width: 150, valueFormatter: (value) => percentFormat(value) },
  { field: 'solids_percentage', headerName: 'Solids Percentage', width: 200, valueFormatter: (value) => percentFormat(value) },
  { field: 'id', headerName: 'ID', width: 150 },
];

const IngredientsDataGrid: React.FC<IngredientsDataGridProps> = ({ rows, setRows }) => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);

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
      return prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row));
    });

    return updatedRow;
  };

  return (
    <div style={{ minHeight:100 ,maxHeight: 400, width: '100%', background:'white' }}>
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
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: { outline: 'none' },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: { outline: 'none' },
          boxShadow: 'none',
        }}
      />
    </div>
  );
};

export default IngredientsDataGrid;
