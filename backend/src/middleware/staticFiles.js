import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupStaticFiles = (app) => {
  app.use("/assets", express.static(join(__dirname, "../../assets")));
};

export default setupStaticFiles;
