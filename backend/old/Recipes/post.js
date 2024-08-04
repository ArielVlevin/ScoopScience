import { Recipe } from "../../src/models/Recipe.js";
import { getLastRecipeID } from "../crud.js";

export default async function postRecipes(app) {
  app.post("/api/post/recipes", async (req, res) => {
    try {
      const data = req.body;
      const newID = (await getLastRecipeID()) + 1;
      const newRecipe = new Recipe({
        _id: newID,
        ...data,
      });

      await newRecipe.save();

      res.status(201).json(newRecipe);
    } catch (error) {
      console.error("Error inserting recipe:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
