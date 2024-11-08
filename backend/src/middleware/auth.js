import jwt from "jsonwebtoken";
import config from "../config/config.js";
export default function authenticateUser(req, res, next) {
  const to = req.header("Authorization");
  const token = to ? to.replace("Bearer ", "") : null;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expired");
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}
