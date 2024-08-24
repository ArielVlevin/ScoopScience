import express from "express";
import { search, autoSearch } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", search);

router.get("/autocomplete", autoSearch);

export default router;
