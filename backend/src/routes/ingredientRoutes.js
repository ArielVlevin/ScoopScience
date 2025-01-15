import express from "express";
import {
  createIngredient,
  getIngredient,
  getAllIngredients,
  fetchIngredients,
  fetchIngredientsByCategory,
  getIngredientsFromOpenFoodApi,
  fetchIngredientCategories,
} from "../controllers/ingredientController.js";

const router = express.Router();
// post
router.post("/post", createIngredient);
// get
router.get("/id/:id", getIngredient);
router.get("/getAll", getAllIngredients);

router.get("/fetchIngredients", fetchIngredients);
router.get("/fetchIngredientsByCategory", fetchIngredientsByCategory);

router.get("/fetchCategories", fetchIngredientCategories);

router.post("/search", getIngredientsFromOpenFoodApi);

export default router;
