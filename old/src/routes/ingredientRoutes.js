import express from "express";
import {
  createIngredient,
  getIngredient,
  getAllIngredients,
  getIngredientsByRecipe,
} from "../controllers/ingredientController.js";

const router = express.Router();
// post
router.post("/post", createIngredient);
// get
router.get("/id/:id", getIngredient);
router.get("/getAll", getAllIngredients);
router.get("/recipe/:recipe", getIngredientsByRecipe);

export default router;
