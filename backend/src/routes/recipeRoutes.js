import express from "express";
import {
  createRecipe,
  getRecipe,
  getAllRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();

router.post("/post", createRecipe);
router.get("/id/:id", getRecipe);
router.get("/recipesArray", getAllRecipes);

export default router;
