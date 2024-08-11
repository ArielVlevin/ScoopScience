import express from "express";
import {
  createRecipe,
  getRecipe,
  getAllRecipes,
  getRecipesByKind,
} from "../controllers/recipeController.js";
import { upload } from "../middleware/staticFiles.js";

const router = express.Router();

router.post("/post", upload.single("photo"), createRecipe);
router.get("/id/:id", getRecipe);
router.get("/recipesArray", getAllRecipes);
router.get("/kind/:kind", getRecipesByKind);

export default router;
