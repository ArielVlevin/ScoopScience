import * as authService from "../services/authService.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    console.log("\nNew User Registered:\n", user, "\n\n");

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await authService.login(
      req.body
    );

    console.log("\nUser Logged In:\n", user, "\n\n");

    console.log(
      "TEST DELETE LATER(controllers/authController.js):\n accessToken:",
      accessToken,
      "refreshToken:",
      refreshToken
    );

    res.json({ accessToken, refreshToken, user });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).send("No refresh token provided.");
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);

    // Issue a new access token
    const accessToken = jwt.sign(
      { _id: decoded._id, username: decoded.username, email: decoded.email },
      config.jwtSecret,
      { expiresIn: "1d" }
    );

    res.json({ accessToken });
  } catch (ex) {
    res.status(400).send("Invalid refresh token.");
  }
};
