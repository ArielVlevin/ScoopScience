import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  allowedOrigins: ["https://scoopscience.com", "http://localhost:3000"],
  jwtSecret: process.env.JWT_SECRET,
  mongoUri:
    "mongodb+srv://arielvlevin:izoehktcEV1puuVl@ariel.vhe225s.mongodb.net/Gelato?retryWrites=true&w=majority&appName=Ariel",
  googleClientId:
    "124765056070-m15sh763v83ukaf0vo3rn1gllps06e7p.apps.googleusercontent.com",
  refreshTokenSecret:
    "e782c257c5ab2369e3f96ec224a3c762a90ce86aa0736f790482b63a84a5b71eb627415e174d01986f68724604bf96c119b9a4ebf9c4ea57f5ce6df66cdf41b9",
};
