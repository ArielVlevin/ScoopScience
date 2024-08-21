import * as authService from "../services/authService.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    console.log(
      "\nNew User Registered:\n",
      user._id,
      user.username,
      user.email,
      "\n"
    );

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

    console.log(
      "\nUser Logged In:\n",
      user._id,
      user.username,
      user.email,
      "\n"
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
    const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);

    const accessToken = jwt.sign(
      { _id: decoded._id, username: decoded.username, email: decoded.email },
      config.jwtSecret,
      { expiresIn: "2h" }
    );

    res.json({ accessToken });
  } catch (ex) {
    res.status(400).send("Invalid refresh token.");
  }
};
