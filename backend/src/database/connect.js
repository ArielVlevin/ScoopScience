import { connect } from "mongoose";
import config from "../config/config.js";
export default async function connectDB() {
  try {
    await connect(config.mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
}
