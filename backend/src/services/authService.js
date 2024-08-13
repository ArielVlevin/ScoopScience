import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const getLastUserID = async () => {
  const lastUser = await User.findOne().sort({ _id: -1 });
  return lastUser ? lastUser._id : 70000;
};
export const register = async ({ username, email, password }) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("Email is already in use");
    }
    if (existingUser.username === username) {
      throw new Error("Username is already in use");
    }
  }
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
    throw new Error("We cannot find an account with that email address");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Your password is incorrect");
  }
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      favorites: user.favorites,
    },
    config.jwtSecret,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      favorites: user.favorites || [],
    },
  };
};
