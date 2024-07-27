import express from "express";
import { connect } from "mongoose";
import recipesRouter from "./Recipes/Recipes.js";
import ingredientsRouter from "./Ingredients/Ingridients.js";
import cors from "cors";
import { join } from "path";
import { fileURLToPath } from "url";
import path from "path";

/// port
const PORT = 3000;
///

///
/// Connect to MongoDB
///
const uri =
  "mongodb+srv://arielvlevin:izoehktcEV1puuVl@ariel.vhe225s.mongodb.net/Gelato?retryWrites=true&w=majority&appName=Ariel";

connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
///
///
///

///
///
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
///
///

///
///
const { static: serveStatic } = express;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", serveStatic(join(__dirname, "assets")));
///
///

///
/// listen
///
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
///
///
///

///
/// API Routes
///
recipesRouter(app);
ingredientsRouter(app);
///
///
///
