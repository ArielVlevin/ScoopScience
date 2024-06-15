import * as React from 'react';
import { DataGrid, GridEventListener, GridRowEditStopReasons, GridRowModel, GridRowModesModel, GridSlots, gridClasses } from '@mui/x-data-grid';
import { Toolbar } from './ToolBar';
import { DataGridColumns } from '../data/DataGrid';
import { Row } from '../../../interfaces/Row';
import { calculateNutritionalValues } from './Calculate';

export interface IngredientsDataGridProps {
  rows: Row[];
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  setTotals: (totals: { totalWeight: number; totalFat: number; totalSol: number, totalSugar: number, totalMSNF: number, totalCalories: number}) => void;
}


const IngredientsDataGrid: React.FC<IngredientsDataGridProps> = ({ rows, setRows, setTotals }) => {
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
    const existingRow = rows.find(row => row.id === newRow.id);
    if (!existingRow) {
      return newRow;
    }
  
    const updatedRow = calculateNutritionalValues(existingRow, newRow.weight);
  
    setRows((prevRows) => {
      return prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row));
      });
  
    return updatedRow;
  };


  return (
    <div style={{  minHeight:100 ,maxHeight: 400, width: '100%' }}>
      <DataGrid
        rows={rows} 
        columns={DataGridColumns.map(column => ({ ...column, resizable: false, width: column.width, align: 'center', headerAlign: 'center' || 150 }))} 
        disableMultipleRowSelection hideFooter disableColumnMenu
        editMode="row"
        onRowSelectionModelChange={(newSelection) => { setSelectedRowIds(newSelection as string[]); }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: Toolbar as GridSlots['toolbar'], }}
        slotProps={{ toolbar: { setRows, setRowModesModel, selectedRowIds, rows}, }}
        sx={{ boxShadow: 'none', outline: 'none', bgcolor: '#CB8851',
          [`& .${gridClasses.columnHeader}`]: { bgcolor:'#784B26' },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {bgcolor:'#826044', outline: 'none' },
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: { bgcolor:'#CB8851',outline: 'none' },
          [`& .${gridClasses.cell}:hover`]: { bgcolor:'#CB8851' },

          [`& .${gridClasses.row}`]: { boxShadow: 'none', bgcolor:'#CB8851' }, 
          [`& .${gridClasses.row}:hover, & .${gridClasses.row}:focus, & .${gridClasses.row}:focus-within`]: { bgcolor:'#CB8851',outline: 'none' }, 
          [`& .${gridClasses.columnSeparator}`]: { color: '#CB8851'},
          [`& .${gridClasses.row}:Separator`]: { color: 'red', bgcolor:'red'},
          '& .MuiDataGrid-row': {backgroundColor: '#CB8851', '&.Mui-selected': { backgroundColor: '#CB8851', '&:hover': {backgroundColor: '#CB8851',},}, 
            '&.MuiDataGrid-row--editing': {backgroundColor: '#CB8851', '& .MuiDataGrid-cell': { backgroundColor: '#CB8851',   },  },  },        }}
      />
    </div>
  );
};

export default IngredientsDataGrid;
