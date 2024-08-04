import express from "express";
import authRoutes from "./authRoutes.js";
import recipeRouter from "./recipeRoutes.js";
import ingredientRouter from "./ingredientRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/recipes", recipeRouter);
router.use("/ingredients", ingredientRouter);

export default router;
