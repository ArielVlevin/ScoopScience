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
    totalSolids: number;
    msnf: number;
    weight: number;
 }
 
