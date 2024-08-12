import { Router } from "express";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favoriteController.js";

const router = Router();

router.post("/add/:recipe_id", addFavorite);
router.delete("/delete/:recipe_id", removeFavorite);
router.get("/get", getFavorites);
export default router;
