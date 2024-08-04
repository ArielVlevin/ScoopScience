import { Router } from "express";
import User from "../../models/User.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
