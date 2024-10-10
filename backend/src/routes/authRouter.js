import { Router } from "express";
import {
  login,
  googleLogin,
  register,
  refreshAccessToken,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);

router.post("/refresh", refreshAccessToken);
export default router;
