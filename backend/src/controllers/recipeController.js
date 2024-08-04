import { Recipe } from "../models/Recipe.js";

const getLastRecipeID = async () => {
  const lastRecipe = await Recipe.findOne().sort({ _id: -1 });
  return lastRecipe ? lastRecipe._id : 0;
};

export const createRecipe = async (req, res) => {
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
};

export const getRecipe = async (req, res) => {
  const recipeID = req.params.id;
  try {
    const recipe = await Recipe.findById(recipeID).exec();
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error("Error retrieving recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).exec();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error finding recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
