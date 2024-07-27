import { getDataByID, getLastInsertedID } from "../database/crud.js";
import { Ingredient } from "../models/Ingredient.js";

export default async function getIngredients(app) {
  app.get("/get/ingredient/:id", async (req, res) => {
    const ingredientsID = req.params.id;
    try {
      const ingredients = await getDataByID(ingredientsID, "Ingredients");

      if (ingredients) {
        res.status(200).json(ingredients);
      } else {
        res.status(404).json({ message: "Ingredient not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/get/ingredients/lastid/:category", async (req, res) => {
    const categoryName = req.params.category;
    try {
      const id = await getLastInsertedID(categoryName);

      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/get/ingredients/ingredientsArray", async (req, res) => {
    try {
      const ingredients = await Ingredient.find({});

      const ingredientsByCategory = ingredients.reduce((acc, ingredient) => {
        const { category, id, name } = ingredient;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({ id, name });
        return acc;
      }, {});

      res.status(200).json(ingredientsByCategory);
    } catch (error) {
      console.error("Error fetching ingredients by category:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get("/get/ingredients/ingredientsArray/:recipe", async (req, res) => {
    const recipeName = req.params.recipe;

    let ingredientIds = [50001];
    if (recipeName === "gelato") {
      ingredientIds = [50001, 52001];
    } else if (recipeName === "iceCream") {
      ingredientIds = [50001, 52001, 58001];
    } else if (recipeName === "sorbet") {
      ingredientIds = [57001, 52001, 54001];
    } else if (recipeName === "other") {
      ingredientIds = [57001, 52001, 56001];
    }

    try {
      const ingredients = await Ingredient.find({
        _id: { $in: ingredientIds },
      });

      res.status(200).json(ingredients);
    } catch (error) {
      console.error("Error fetching basic ingredients:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
