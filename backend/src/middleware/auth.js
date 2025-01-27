import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default function authenticateUser(requireAuth = true) {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;

    if (!token) {
      if (requireAuth) {
        // Block access if authentication is required but no token is provided
        return res
          .status(401)
          .json({ message: "Access denied. No token provided." });
      } else {
        // Allow unauthenticated access for free pages
        req.user = null;
        return next();
      }
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded; // Attach user data to req.user
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}
