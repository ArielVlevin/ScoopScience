import { disconnect } from "mongoose";

export default async function disconnectDB() {
  try {
    await disconnect();
    console.log("MongoDB connection closed with Mongoose");
  } catch (error) {
    console.error("Error closing MongoDB connection with Mongoose:", error);
    throw error;
  }
}
