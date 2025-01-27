import express from "express";
import {
  createRecipe,
  editRecipe,
  deleteRecipe,
  getRecipe,
  setRate,
  fetchRecipes,
} from "../controllers/recipeController.js";
import { upload } from "../middleware/staticFiles.js";

import authenticateUser from "../middleware/auth.js";
const router = express.Router();

router.post("/post", upload.single("photo"), authenticateUser, createRecipe);

router.put("/id/:id", upload.single("photo"), authenticateUser, editRecipe);

router.delete("/id/:id", authenticateUser, deleteRecipe);

router.get("/id/:id", authenticateUser(false), getRecipe);
router.get("/fetchRecipes", authenticateUser(false), fetchRecipes);

router.post("/id/:id/rate", authenticateUser, setRate);

export default router;
