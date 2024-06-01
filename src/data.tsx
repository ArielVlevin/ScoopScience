import { RecipeData } from "./components/cards/recipeType";

export const ratingOptions = [0, 3, 3.5, 4, 4.5];
export const typeOptions = ['', 'gelato', 'ice cream', 'sorbet'];
const recipes
   : RecipeData[] = [
      {
         recipeId: "1",
         recipeName: "Recipe 1",
         user: { userID: "1", userName: "User 1" },
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
               [{ ingredientID: "1", name: "Milk", category: "milk base", fat_percentage: 2, solids_percentage: 8 }, 500],
               [{ ingredientID: "2", name: "Sugar", category: "sugars", fat_percentage: 0, solids_percentage: 100 }, 200],
            ],
            kind: 'ice cream',
            totalWeight: 700,
            butterFat: 10,
            msnf: 20,
            pac: 30,
            pod: 40,
            totalSolid: 50,
         },
      },
      // Add more RecipeData objects as needed
    ];
 
 export default recipes;
 