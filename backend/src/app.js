import express from "express";
import setupStaticFiles from "./middleware/staticFiles.js";
import connectDB from "./database/connect.js";
import exitHandler from "./database/exitHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import config from "./config/config.js";
import apiRouter from "./routes/apiRouter.js";

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (config.allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

setupStaticFiles(app);

//
app.use("/api", apiRouter);

// Connect to MongoDB
connectDB();

app.use(errorHandler);

// Handle exit events
exitHandler();

export default app;
