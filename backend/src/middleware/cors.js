import cors from "cors";
import { corsOptions } from "../config/corsConfig.js";

export const corsMiddleware = cors(corsOptions);
