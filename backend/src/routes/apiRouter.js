import express from "express";
import authRouter from "./authRouter.js";
import recipeRouter from "./recipeRoutes.js";
import ingredientRouter from "./ingredientRoutes.js";
import favoriteRouter from "./favoriteRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/recipes", recipeRouter);
router.use("/ingredients", ingredientRouter);
router.use("/favorites", favoriteRouter);

export default router;
