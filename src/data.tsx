import { RecipeData } from "./Types/recipe";

export const ratingOptions = [0, 3, 3.5, 4, 4.5];
export const typeOptions = ['', 'gelato', 'ice cream', 'sorbet'];
const recipes
   : RecipeData[] = [
      {
         id: "2",
         recipeName: "nice cream 1",
         user: { id: "1", userName: "User 1" },
         specialMarks: {
           lowSugar: false,
           highSugar: true,
           subSugar: false,
           lowFat: false,
           highFat: true,
           vegan: false,
           withEggs: true,
         },
         recipeRating: {
           likes: 10,
           ratingValue: 4.5,
           ratingAmount: 20,
         },
         recipeIngredient: {
           ingredients: [
             [
               {
                 id: "1",
                 name: "Milk",
                 category: "dairy",
                 calories: 42,
                 fat: 2,
                 protein: 3.4,
                 totalSolid: 12.5,
                 sugar: 9.5,
                 msnf: 8.5,
               },
               500,
             ],
             [
               {
                 id: "2",
                 name: "Sugar",
                 category: "sugars",
                 calories: 387,
                 fat: 0,
                 protein: 0,
                 totalSolid: 100,
                 sugar: 100,
                 msnf: 0,
               },
               200,
             ],
           ],
           kind: "ice cream",
           totalWeight: 700,
           butterFat: 10,
           msnf: 20,
           pac: 30,
           pod: 40,
           totalSolid: 50,
         },
       }, 
    ];
 
 export default recipes;
 