import express from "express";
import {
  createIngredient,
  getIngredient,
  getAllIngredients,
  fetchIngredients,
  fetchIngredientsByCategory,
  getIngredientsByRecipe,
  getIngredientsFromOpenFoodApi,
} from "../controllers/ingredientController.js";

const router = express.Router();
// post
router.post("/post", createIngredient);
// get
router.get("/id/:id", getIngredient);
router.get("/getAll", getAllIngredients);

router.get("/fetchIngredients", fetchIngredients);
router.get("/fetchIngredientsByCategory", fetchIngredientsByCategory);

router.get("/recipe/:recipe", getIngredientsByRecipe);

router.post("/search", getIngredientsFromOpenFoodApi);

export default router;
