import disconnectDB from "./disconnect.js";

export default function exitHandler() {
  process.on("SIGINT", async () => {
    console.log("SIGINT signal received: closing MongoDB connection");
    await disconnectDB();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing MongoDB connection");
    await disconnectDB();
    process.exit(0);
  });
}
