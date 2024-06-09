import { GridRowsProp, GridRowModesModel } from "@mui/x-data-grid";
import { IngredientCategory } from "../../../Types/ingredient";



export interface Row {
    id: string;
    name: string;
    category: IngredientCategory;
    calories: number;
    sugar: number;
    fat: number;
    protein: number;
    totalSolid: number;
    msnf: number
    weight: number;
 }
 
 export interface IngredientsDataGridProps {
   rows: Row[];
   setRows: React.Dispatch<React.SetStateAction<Row[]>>;
   setTotals: (totals: { totalWeight: number; totalFat: number; totalSolid: number, totalSugar: number, totalMSNF: number, totalCalories: number}) => void;
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
 