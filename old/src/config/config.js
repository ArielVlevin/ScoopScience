import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGODB_URI,

  refreshTokenSecret:
    "e782c257c5ab2369e3f96ec224a3c762a90ce86aa0736f790482b63a84a5b71eb627415e174d01986f68724604bf96c119b9a4ebf9c4ea57f5ce6df66cdf41b9",
};
