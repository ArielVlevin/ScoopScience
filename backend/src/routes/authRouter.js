import { Router } from "express";
import {
  login,
  register,
  refreshAccessToken,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.post("/refresh", refreshAccessToken);
export default router;
