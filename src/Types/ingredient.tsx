export type IngredientCategory = 'dairy' | 'sugars' | 'stabilizer' | 'fruits' | 'adding'| 'nuts';


export type Ingredient={
  id: string;
  name: string;
  category: IngredientCategory;
  calories: number;
  sugar: number;
  fat: number;
  proteins: number;
  solids_percentage: number;
  msnf: number
};


export type IngredientInfo = [
  ingredientData: Ingredient, weight: number,
];