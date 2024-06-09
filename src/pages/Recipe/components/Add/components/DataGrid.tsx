import * as React from 'react';
import { DataGrid, GridEventListener, GridRowEditStopReasons, GridRowModel, GridRowModesModel, GridSlots, gridClasses } from '@mui/x-data-grid';
import { Toolbar } from './ToolBar';
import { DataGridColumns } from '../data/DataGrid';
import { IngredientsDataGridProps, Row } from '../../../interfaces/recipe';



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
      calories: newRow.calories,
      category: newRow.category,
      sugar: newRow.sugar,
      fat: newRow.fat,
      protein: newRow.protein,
      totalSolid : newRow.totalSolid,
      msnf: newRow.msnf,
      weight: newRow.weight,
    };

    setRows((prevRows) => {
      return prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row));
    });

    return updatedRow;
  };

  return (
    <div style={{ minHeight:100 ,maxHeight: 400, width: '100%' }}>
      <DataGrid
        rows={rows} columns={DataGridColumns}
        disableMultipleRowSelection hideFooter disableColumnMenu
        editMode="row"
        onRowSelectionModelChange={(newSelection) => { setSelectedRowIds(newSelection as string[]); }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: Toolbar as GridSlots['toolbar'], }}
        slotProps={{ toolbar: { setRows, setRowModesModel, selectedRowIds, rows }, }}
        sx={{ boxShadow: 'none',
          [`& .${gridClasses.columnHeader}`]: { bgcolor:'#784B26' },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {bgcolor:'#826044', outline: 'none' },
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: { bgcolor:'#CB8851',outline: 'none' },
          [`& .${gridClasses.cell}:hover`]: { bgcolor:'#CB8851' },
          [`& .${gridClasses.row}`]: { boxShadow: 'none', bgcolor:'#CB8851' }, 
          [`& .${gridClasses.row}:hover, & .${gridClasses.row}:focus, & .${gridClasses.row}:focus-within`]: { bgcolor:'#CB8851',outline: 'none' }, 
          [`& .${gridClasses.editInputCell}`]: { bgcolor: '#826044' },
          [`& .${gridClasses.columnSeparator}`]: { color: '#CB8851'},
           }}
      />
    </div>
  );
};

export default IngredientsDataGrid;
