import express from "express";
import { corsMiddleware } from "./middleware/cors.js";
import setupStaticFiles from "./middleware/staticFiles.js";
import connectDB from "./database/connect.js";
import exitHandler from "./database/exitHandler.js";
import errorHandler from "./middleware/errorHandler.js";

import apiRouter from "./routes/apiRouter.js";

const app = express();

app.use(corsMiddleware);

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
