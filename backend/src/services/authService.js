import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(config.googleClientId);

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      recipes: user.recipes || [],
      favorites: user.favorites || [],
    },
    config.jwtSecret,
    { expiresIn: "2h" }
  );

  const refreshToken = jwt.sign({ _id: user._id }, config.refreshTokenSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

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
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("We cannot find an account with that email address");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Your password is incorrect");
  }
  const { accessToken, refreshToken } = generateTokens(user);

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      favorites: user.favorites || [],
      recipes: user.recipes || [],
    },
  };
};

export const googleLogin = async (googleToken) => {
  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: config.googleClientId,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    console.log(
      "/services/authService.js: googleLogin function, $payload:\n",
      payload
    );

    // Find the user by email
    let user = await User.findOne({ email });

    const googleusername = "g" + payload.given_name;
    // If the user doesn't exist, create a new user
    if (!user) {
      console.log("the google user doesn't exist creating new user! ");
      const newID = (await getLastUserID()) + 1;
      user = new User({
        _id: newID,
        username: googleusername, // Use Google name
        email: email,
        password: "nopasswordneeded", // No password since it's Google OAuth
      });
      await user.save();
    }

    console.log("user created/ login: ", user);

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateTokens(user);

    return {
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        favorites: user.favorites || [],
        recipes: user.recipes || [],
      },
    };
  } catch (error) {
    throw new Error("Google login failed");
  }
};
