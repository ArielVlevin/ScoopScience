import { GridRowsProp, GridRowModesModel } from "@mui/x-data-grid";



export interface Row {
   id: string;
   name: string;
   category: string;
   fat_percentage: number;
   solids_percentage: number;
   weight: number;
 }
 
 export interface IngredientsDataGridProps {
   rows: Row[];
   setRows: React.Dispatch<React.SetStateAction<Row[]>>;
   setTotals: (totals: { totalWeight: number; totalFat: number; totalSolid: number }) => void;
 }




//ToolBar props
 export interface ToolbarProps {
   setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
   setRowModesModel: (
     newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
   ) => void;
   selectedRowIds: string[];
   rows: GridRowsProp;
 }
 