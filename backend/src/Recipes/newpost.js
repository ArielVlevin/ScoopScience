import { insertData } from "../database/crud.js";

export default async function postRecipes(app) {
  app.post("/post/recipes", async (req, res) => {
    try {
      const recipe = req.body;

      const insertedId = await insertData(recipe, "Recipes");

      res.status(201).json({ insertedId });
    } catch (error) {
      console.error("Error inserting recipe:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
