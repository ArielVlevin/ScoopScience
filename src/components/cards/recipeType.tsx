
export type User={
   id: string,
   userName: string,
 };
 


export type SpecialMarks={
   lowSugar: boolean,
   highSugar: boolean,
   subSugar: boolean,
   lowFat: boolean,
   highFat: boolean,
   vegan: boolean,
   withEggs: boolean,
}

 export type RecipeRating={
   likes: number,
   ratingValue:number,
   ratingAmount:number,
 };

 export type IngredientCategory = 'milk base' | 'sugars' | 'stabilizer' | 'fruits' | 'adding';


 export type IngredientData={
   id: string;
   name: string;
   category: IngredientCategory;
   fat_percentage: number;
   solids_percentage: number;
 };
 

 export type Ingredient = [
   ingredientData: IngredientData, weight: number,
 ];

 
export type RecipeKind = 'gelato' | 'ice cream' | 'sorbet' | 'other';


 export type Ingredients={
   ingredients:Ingredient[],
   kind:RecipeKind,
   totalWeight: number,
   butterFat:number,
   msnf: number,
   pac: number,
   pod: number,
   totalSolid: number,
 };
 


 export type RecipeData = {
    id: string;
    recipeName:string,
    user: User,
    specialMarks: SpecialMarks,
    recipeRating:RecipeRating,
    recipeIngredient :Ingredients,
 };