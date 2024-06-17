import { IngredientInfo } from "./ingredient";


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


export type RecipeKind = 'gelato' | 'iceCream' | 'sorbet' | 'other';

export const typeOptions = ['gelato', 'iceCream', 'sorbet', 'other'];



 export type Ingredients={
   ingredients:IngredientInfo[],
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



 