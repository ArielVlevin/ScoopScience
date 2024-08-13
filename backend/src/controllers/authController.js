import * as authService from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};
