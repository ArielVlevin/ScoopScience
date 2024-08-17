import express from "express";
import {
  createRecipe,
  getRecipe,
  setRate,
  getAllRecipes,
  getRecipesByKind,
  getPaginatedRecipes,
} from "../controllers/recipeController.js";
import { upload } from "../middleware/staticFiles.js";

const router = express.Router();

router.post("/post", upload.single("photo"), createRecipe);

router.get("/id/:id", getRecipe);
router.get("/recipesArray", getAllRecipes);
router.get("/kind/:kind", getRecipesByKind);

router.get("/paginated", getPaginatedRecipes);

router.post("/id/:id/rate", setRate);

export default router;
