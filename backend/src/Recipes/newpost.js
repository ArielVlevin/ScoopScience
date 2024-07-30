import { Recipe } from "../models/Recipe.js";

export default async function postRecipes(app) {
  app.post("/post/recipes", async (req, res) => {
    try {
      const { recipeData, recipeRating, recipeIngredient } = req.body;

      console.log("data:", recipeData, recipeRating, recipeIngredient);
      const newRecipe = new Recipe({
        recipeData,
        recipeRating,
        recipeIngredient,
      });

      await newRecipe.save();

      res.status(201).json(newRecipe);
    } catch (error) {
      console.error("Error inserting recipe:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
