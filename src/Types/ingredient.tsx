
export const ingredientCategoryArray = ['dairy', 'sugars', 'stabilizer', 'fruits', 'adding', 'nuts', 'liquid' , 'other'];

export type IngredientCategory = 'dairy' | 'sugars' | 'stabilizer' | 'fruits' | 'adding'| 'nuts';


export type Ingredient={
  id: string;
  name: string;
  category: IngredientCategory;
  calories: number;
  sugar: number;
  fat: number;
  protein: number;
  totalSolids: number;
  msnf: number
};


export type Row ={
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
};



export type IngredientInfo = [
  ingredientData: Ingredient, weight: number,
];


export type IngredientsArray ={ [key: string]: { id: string, name: string }[] };





