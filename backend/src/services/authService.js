import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const getLastUserID = async () => {
  const lastUser = await User.findOne().sort({ _id: -1 });
  return lastUser ? lastUser._id : 70000;
};
export const register = async ({ username, email, password }) => {
  const newID = (await getLastUserID()) + 1;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    _id: newID,
    username,
    email,
    password: hashedPassword,
  });
  await user.save();
  return user;
};

export const login = async ({ email, password }) => {
  console.log("email: ", email, " password: ", password);
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
    expiresIn: "1h",
  });
  return token;
};