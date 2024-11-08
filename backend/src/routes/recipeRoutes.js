import express from "express";
import {
  createRecipe,
  editRecipe,
  deleteRecipe,
  getRecipe,
  setRate,
  getAllRecipes,
  getRecipesByKind,
  getPaginatedRecipes,
  getRecipesByDate,
  getRecipesByRate,
} from "../controllers/recipeController.js";
import { upload } from "../middleware/staticFiles.js";

import authenticateUser from "../middleware/auth.js";
const router = express.Router();

router.post("/post", upload.single("photo"), authenticateUser, createRecipe);

router.put("/id/:id", upload.single("photo"), authenticateUser, editRecipe);

router.delete("/id/:id", authenticateUser, deleteRecipe);

router.get("/id/:id", getRecipe);
router.get("/recipesArray", getAllRecipes);
router.get("/kind/:kind", getRecipesByKind);

router.get("/paginated", getPaginatedRecipes);
router.get("/getRecipesByDate", getRecipesByDate);
router.get("/getRecipesByRate", getRecipesByRate);

router.post("/id/:id/rate", authenticateUser, setRate);

export default router;
