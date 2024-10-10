import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";
import multer from "multer";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const setupStaticFiles = (app) => {
  app.use("/assets", express.static(join(__dirname, "../../assets")));
  app.use(
    "/uploads",
    express.static(join(__dirname, "../../assets/uploads/recipes"))
  );
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../../assets/uploads/recipes/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

export default setupStaticFiles;
